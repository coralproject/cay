# cat Dockerfile 
FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY assets/nginx.conf /etc/nginx/
ADD assets/ /assets
ENTRYPOINT ["/assets/entrypoint.sh"]
