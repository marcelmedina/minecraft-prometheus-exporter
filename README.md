# minecraft-prometheus-exporter
A nodejs web app that exposes Minecraft stats through Prometheus compatible exporter, which can be consumed by Grafana.
This project was created for the Microsoft Openhack training.

To get this working, `git clone https://github.com/marcelmedina/minecraft-prometheus-exporter.git`

Build your image:
`docker build -t openhack/node-web-app:1.0 .`

Run your container:
`docker run -p 8080:3001 -d openhack/node-web-app:1.0`

Open the browser to see the metrics:
http://localhost:8080/metrics

The json exposed queries **mcapi.us**, as you can check on line 8:
`http://mcapi.us/server/status?ip=52.147.29.192`
