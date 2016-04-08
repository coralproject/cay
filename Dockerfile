FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY assets/nginx.conf /etc/nginx/

COPY assets/config_from_env.sh /tmp/config_from_env.sh
RUN chmod +x /tmp/config_from_env.sh

CMD ["/tmp/config_from_env.sh"]
