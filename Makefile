.PHONY: test

test:
	docker compose run --rm lorawan-device-profiles --run 'cd test-runner && cargo run'

