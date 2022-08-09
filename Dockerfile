FROM node:16-alpine AS builder
ENV NODE_ENV production

WORKDIR /user/src/frontend

COPY package* ./
RUN npm install --production
COPY . ./

RUN npm run build


EXPOSE 3000


#build for production served by nginx
FROM nginx:1.23-alpine as production
ENV NODE_ENV production

#copy build assests from our build
COPY --from=builder /user/src/frontend/build /usr/share/nginx/html

#load the config file
COPY nginx.config /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
