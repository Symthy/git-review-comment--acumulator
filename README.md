# git-review-comment--acumulator

## System Test

Required startup gitlab container.

```sh
cp conf/.env.template conf/.env
# should set the value of GITLAB_VOLUME_PATH in .env file.
./docker/run_gitlab_continer.sh
```

Access to http://localhost

※ how to confirm password of gitlab's root account

```
docker container exec -it gitlab bash
cat /etc/gitlab/initial_root_password
```
