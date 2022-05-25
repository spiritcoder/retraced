# Build Stage 1
# This build created a staging docker image
#
FROM mhart/alpine-node:14  as Base

WORKDIR /retraced

RUN apk add --no-cache make gcc g++ python

RUN apk add --no-cache nodejs bash
   
COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3000

# Build Stage 2
# This build takes the production build from staging build
#
FROM mhart/alpine-node:14 

WORKDIR /retraced

COPY --from=Base /retraced .

# Sets the command and parameters that will be executed first when a container is ran.
CMD ["npm", "start"]