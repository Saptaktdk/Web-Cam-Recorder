build:
	docker build -t web-cam-recorder:1.0.0 .

run:
	docker run -d --rm -it --name web-cam-recorder -p 5000:80 web-cam-recorder:1.0.0