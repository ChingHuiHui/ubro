From quay.io/raylin9981/ubro:node
COPY ./ /app
WORKDIR /app
RUN yarn install && yarn build