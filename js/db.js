window.db = {};

db.options = {
  token: '9b5'+'90'+'bef'+'358'+'4f8'+'a8bb'+'08'+'1a2f3'+'f7b8'+'3ec'+'03c'+'3cd'+'68',
  username: 'xxx',
  githuburl: 'https://api.github.com/repos/matheusauthor/matheusauthor.github.io/contents/backups/',
}

db.backup = function() {
  debug("Iniciando o backup...");

  var content = Base64.encode("conteudo do arquivo aqui");
  var token = db.options.token;
  var githuburl = db.options.githuburl + db.options.username + '.txt'; 
  debug(githuburl);
  $.ajax({
    url: githuburl,
  }).done(function(r){
    debug("Arquivo de backup já existe. Atualizando...");
    $.ajax({
      url: githuburl,
      type: 'PUT',
      headers: {"Authorization": "token "+ token},
      data: '{"content": "'+ content +'", "sha": "'+ r.sha +'", "committer": {"name": "Matheus Author", "email": "matheus.author@gmail.com"}, "message":""}'
    }).done(function(r){
      debug("Backup realizado com sucesso!");
    }).fail(function(jqXHR, textStatus){
      db.refreshViews();
      debug('Backup falhou!');
      debug(jqXHR);
    });
  }).fail(function (jqXHR, textStatus) {
    if (jqXHR.status === 404) {
      debug("Arquivo de backup não existe. Criando...");
      $.ajax({
        url: githuburl,
        type: 'PUT',
        headers: {"Authorization": "token "+ token},
        data: '{"content": "'+ content +'", "committer": {"name": "Matheus Author", "email": "matheus.author@gmail.com"}, "message":""}'
      }).done(function(r){
        debug("Backup realizando com sucesso!");
      });
    }
  });
}



