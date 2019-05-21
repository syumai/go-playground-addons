PORT = 8080

.PHONY: run
run:
	docker run --name=play --rm -p $(PORT):8080 -v \
		$(PWD)/develop/playground-embed.js:/app/static/playground-embed.js -v \
		$(PWD)/addon.css:/app/static/addon.css -v \
		$(PWD)/dist/bundle.js:/app/static/bundle.js \
		syumai/playground:latest

.PHONY: extension
extension:
	yarn build-prod
	cp addon.css extension
	cp dist/bundle.js extension
	cd extension && zip -r ../extension.zip ./*
