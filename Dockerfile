# Используем официальный образ Nginx
FROM nginx:alpine

# Копируем статические файлы в директорию Nginx
COPY html/ /usr/share/nginx/html

# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
