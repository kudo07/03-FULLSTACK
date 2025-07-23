ssh-keygen

cd .ssh

cat id_rsa2

cat id_rsa2.pub

<!-- ADD IN THE GITHUB TO AVOID ENTER PASSWORD EVERYTIME WE NEED TO PUSH THE CODE
 -->

paste there public key in the "Add new SSH key"

now we can clone the repo with the ssh
for exaple there is a private repo i can access through the ssh and now no need to give the password

same thing in the digital ocean

1. ssh keygen
2. create the file in the digital ocean while creating the droplet so that we can access server or machine
3. ssh root@ip_address
4. cat /.ssh/authorized_key
