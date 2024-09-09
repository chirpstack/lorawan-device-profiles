.PHONY: test fmt devshell

test:
	docker compose run --rm lorawan-device-profiles --run 'cd test-runner && cargo run'

fmt:
	docker compose run --rm lorawan-device-profiles --run 'taplo fmt'

devshell:
	docker-compose run --rm lorawan-device-profiles
