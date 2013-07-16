
[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*

# Go to directories.
alias towork="cd ~/Work"

# Nginx
alias nginx="sudo env rvm_trust_rvmrcs_flag=1 /opt/nginx/sbin/nginx"
alias stopnginx="sudo /opt/nginx/sbin/nginx -s stop"

# Increase memory available to Postgres
alias pgmemory="sudo sysctl -w kern.sysv.shmmax=1073741824 && sudo sysctl -w kern.sysv.shmall=1073741824"

# Git.
alias gs="git status"
alias gl="git log"
alias gc="git commit"
alias gd="git diff"
alias gdc="git diff --cached"

# Misc. other.
alias ll="ls -l"
