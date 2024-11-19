.PHONY: test nix-start nix-test

test:
	docker compose run --rm lorawan-device-profiles --run 'make nix-test'

nix-start:
	cd interface/ui && yarn build
	cd interface && cargo run

nix-test:
	cd interface && make api ui
	cd interface && cargo run run-tests
