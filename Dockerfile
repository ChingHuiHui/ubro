FROM quay.io/raylin9981/ubro:build
COPY ./ /app
WORKDIR /app
RUN yarn install && yarn build

FROM quay.io/raylin9981/ubro:nginx
RUN mkdir -p /app/ubro
COPY --from=0 /app/dist /app/ubro
COPY nginx.conf /etc/nginx/nginx.conf