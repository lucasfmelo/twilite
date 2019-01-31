
const USUARIOS_API = "http://127.0.0.1:3333/api/v1/usuarios/";
const PUBLICACOES_API = "http://127.0.0.1:3333/api/v1/publicacoes/";

var vmLogar = new Vue({
    el: '#logar',
    data: {
        login: '',
        senha: ''
    },
    methods :{
        logarUsuario: function() {
            axios({
                method: "POST", 
                url: USUARIOS_API+"buscar",
                data: {
                    "login": this.login
                }
            }).then(
                result => {
                    if((result.data[0]) && (result.data[0].senha == this.senha)) {
                        window.location.href = './posts.html?id_usuario='+result.data[0].id;
                        // direcionar para página 'posts.html', passando 'id'
                    } else {
                        alert('Usuário ou senha incorretos!');
                    }
                },
                error => {
                    console.error(error);
                }
            );            
        }
    }
});

var vmCadastrar = new Vue({
    el: '#cadastrar',
    data: {
        login: '',
        senha: '',
        email: ''
    },
    methods :{
        cadastrarUsuario: function() {
            axios({
                method: "POST",
                url: USUARIOS_API, 
                data: {
                    "login": this.login,
                    "senha": this.senha,
                    "email": this.email
                }
            }).then(
                result => {
                    vmLogar.login = this.login;
                    vmLogar.senha = this.senha;
                    vmLogar.logarUsuario();
                },
                error => {
                    console.error(error);
                }
            );            
        }
    }
});

var vmPostar = new Vue({
    el: '#postar',
    data: {
        id_usuario: getUrlVars()["id_usuario"],
        login_usuario: USUARIOS_API+getUrlVars()["id_usuario"],
        conteudo: ''
    },
    mounted() {
        axios({
            method: "GET",
            url: USUARIOS_API+getUrlVars()["id_usuario"],
            data: {
            }
        }).then(
            result => {
                this.login_usuario = result.data.login;
            },
            error => {
                console.error(error);
            }
        );
    },
    methods :{
        postarConteudo: function() {
            axios({
                method: "POST",
                url: PUBLICACOES_API, 
                data: {
                    "id_usuario": this.id_usuario,
                    "conteudo": this.conteudo
                }
            }).then(
                result => {
                    this.conteudo = '';
                    vmListar.atualizarLista();
                    // enviar email para todos os usuarios
                    /*axios({
                        method: "POST",
                        url: USUARIOS_API+"notificar", 
                        data: {
                        }
                    })*/
                },
                error => {
                    console.error(error);
                }
            );
        }
    }
});

var vmListar = new Vue({
    el: '#listar',
    data: {
        posts:[]
    },
    mounted() {
        this.atualizarLista();
    },
    methods :{
        atualizarLista: function() {
            axios({
                method: "GET", 
                url: PUBLICACOES_API 
            }).then(
                result => {
                    this.posts = result.data;
                },
                error => {
                    console.error(error);
                }
            );
        }
    }
});

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}