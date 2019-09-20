# bus_incomes vue front end project

## Deploy

###Ubuntu Deploy

####Install yarn
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
# install nodejs On Ubuntu 16.04 or below
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
# Finish yarn installation
sudo apt-get update && sudo apt-get install yarn
```

####Install vue-cli
```
sudo yarn global add @vue/cli
sudo yarn global add @vue/cli-service-global
```

## Project setup, update and build
```
# project position :/var/git/web/bus_incomes_front/dist
cd /var/git/web/bus_incomes_front/
sudo git pull
sudo yarn install
sudo yarn run build
```

## Development
### Create Project
```
# Create a folder named bus_incomes and initial vue dependence
vue create bus_incomes
```

### Add new package
```
yarn add bootstrap-vue bootstrap vue-router axios vue-moment vue-chartjs chart.js vuelidate lodash

# If it's not a new project run to install dependency

yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Open this project in a browser tab.
```
yarn run serve --open
```


## Test on server

### Check if has process listen on 8080
```
netstat -nat | grep LISTEN
sudo lsof -t -i:8080
# If change config file /etc/nginx/conf.d/bus_incomes.conf
sudo nginx -s reload
```

###
```
wget -qO- http://localhost:8000/incomes/2019/05
```
