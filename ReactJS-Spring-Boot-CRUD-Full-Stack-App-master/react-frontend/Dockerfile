FROM node:18-alpine AS build
WORKDIR /app

COPY react-frontend/package*.json ./
RUN npm install

COPY react-frontend/ .
ARG REACT_APP_API_BASE_URL=/api/v1
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY react-frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
