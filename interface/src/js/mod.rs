use anyhow::{anyhow, Result};
use rquickjs::CatchResultExt;

mod vendor_base64_js;
mod vendor_buffer;
mod vendor_ieee754;

pub fn run_tests(function: &str, codec: &str, codec_tests: &str) -> Result<()> {
    let resolver = rquickjs::loader::BuiltinResolver::default()
        .with_module("base64-js")
        .with_module("ieee754")
        .with_module("buffer");
    let loader = rquickjs::loader::BuiltinLoader::default()
        .with_module("base64-js", vendor_base64_js::SCRIPT)
        .with_module("ieee754", vendor_ieee754::SCRIPT)
        .with_module("buffer", vendor_buffer::SCRIPT);

    let rt = rquickjs::Runtime::new()?;
    rt.set_loader(resolver, loader);

    let ctx = rquickjs::Context::full(&rt)?;

    let script = format!(
        r#"
        {}

        const tests = {};

        for (test of tests) {{
            const out = {}(test.input);
            if (JSON.stringify(out) !== JSON.stringify(test.expected)) {{
                throw new Error("Test '"+ test.name +"' failed - Expected: " + JSON.stringify(test.expected) + " Got: " + JSON.stringify(out));
            }}
        }}
        "#,
        codec, codec_tests, function
    );

    ctx.with(|ctx| -> Result<()> {
        let buff = rquickjs::Module::declare(
            ctx.clone(),
            "b",
            r#"
            import { Buffer } from "buffer";
            export { Buffer }
            "#,
        )?;

        let (buff, buff_promise) = buff
            .eval()
            .catch(&ctx)
            .map_err(|e| anyhow!("JS error: {}", e))?;
        let _ret: rquickjs::Value = buff_promise.finish()?;
        let buff: rquickjs::Function = buff.get("Buffer")?;

        let globals = ctx.globals();
        globals.set("Buffer", buff)?;

        let mut eval_options = rquickjs::context::EvalOptions::default();
        eval_options.strict = false;

        let _ret: rquickjs::Value = ctx
            .eval_with_options(script, eval_options)
            .catch(&ctx)
            .map_err(|e| anyhow!("JS error: {}", e))?;

        Ok(())
    })
}
