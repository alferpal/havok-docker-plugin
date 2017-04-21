# havok-docker-plugin
Docker authz plugin proof of concept

### What you'll need to test this:

- Install nodejs ( at least node 4.x LTS, I did it with 6.9 LTS so better be sure with that https://github.com/nodesource/distributions

- After installing node, run `npm install`.

- Then `npm start` or `node server.js`

- You'll need to copy the havok.json file to `/etc/docker/plugins` so something like `sudo cp havok.json /etc/docker/plugins` ( It's possible that `/etc/docker/plugins` doesn't exist ¯\_(ツ)_/¯, in that case, create the folder)

- Then modify your `docker.service` (should be `/lib/systemd/system/docker.service` ) so that the line with `ExecStart=` includes `--authorization-plugin=havok`

- Reboot the docker service `systemctl restart docker.service`

- Have fun with it only letting you use stuff on even minutes 


### To remove it:

- Remove what you added to docker.service

- Remove the file you added to /etc/docker/plugins

- Restart docker
