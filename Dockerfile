# FROM nginx:1.23.3-alpine
FROM nginx

COPY dist/genericapp/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]
