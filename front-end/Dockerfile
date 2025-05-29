# avoid routine error problem: error:0308010C:digital envelope routines::unsupported
FROM node:18-alpine

# folder where the build will go
WORKDIR /tmp/react

# copy files into the WORKDIR folder
COPY . .

# install project dependencies
RUN npm i && npm run build && mkdir -p /var/www/html && mv build/* /var/www/html

# exit the folder
WORKDIR /

# remove the entire development directory
RUN rm -rf /tmp/react
