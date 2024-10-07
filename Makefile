dev:
	docker compose up
clean:
	docker compose down
	docker rmi exnaton-demo-client exnaton-demo-api