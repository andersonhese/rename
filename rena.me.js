/*
Author: Anderson Hese
GitHub: https://github.com/andersonhese/rename-me
License: MIT
*/

function RenaME (t) {
  this._registeredEvents = []

  if (typeof(t) === 'object') {
    for (var key in t) {
      this['_'+key] = t[key]
    }
  } else {
    this._txt = t || ''
  }

  if (!this._txt) {
    this._txt = ''
  }

  this._txt_o = this._txt
  this._txt_c = this._txt
  this._txt_u = this._txt.split(' ').filter(function (k) {
    if (k.length > 1 && k.length < 4) return false;
    else return k;
  })

  if (this._input) {
    if (this._input.data('rename-label')) {
      this._label = $(this._input.data('rename-label'))
      this._input.on("keyup paste", function(){
        $(this).prop('rnme')._txt = $(this).val()
        $(this).prop('rnme')._label.html($(this).prop('rnme').capitalize().toString())
      })
    } else {
      this._input.on("keyup paste", function(){
        $(this).prop('rnme')._txt = $(this).val()
        $(this).val($(this).prop('rnme').capitalize().toString())
      })
    }
    this._input.prop('rnme',this)
  }
}

/**
 * Descrição: Capitaliza o nome e o mantém em um padrão
 * Exemplo: juquinha de souza lopes > Juquinha de Souza Lopes
 */
RenaME.prototype.capitalize = function () {
  var b = this._txt.split(' ')
  var k = ''
  for (var x = 0, len = b.length; x < len; x++) {

    if (b[x].length > 1 && b[x].length < 4 ) {
      k += ' ' + b[x].toLowerCase()
      continue;
    }

    k += ' ' + b[x].charAt(0).toUpperCase() + b[x].slice(1).toLowerCase()
  }
  if (!this._input) {
    k = k.trim()
  } else {
    k = k.trimStart()
  }
  this._txt = k
  this._txt_c = k
  return this
}

/**
 * Descrição 1: Obtém o nome como em um cartão de credito
 * Exemplo 1: getCardLike() > Juquinha S Lopes
 * Descrição 2: É possível obter o nome com pontos
 * Regra 2: adicione a propriedade "dot: true" na chamada da função
 * Exemplo: getCardLike({dot: true}) > Juquinha S. Lopes
 */
RenaME.prototype.getCardLike = function (extp) {
  extp = extp ? extp : {}

  var b = this._txt_o.split(' ')
  var k = ''
  for (var i = 0, len = b.length; i < len; i++) {
    var wd = b[i]

    if (wd.length < 4) {
      if (this._suffix) {
        k += ' ' + wd.toLowerCase()
      }
      continue;
    }

    var isfol = ((i === 0 || (i+1) === len) ? true : false)
    if (isfol)
      k += ' ' + wd.charAt(0).toUpperCase() + wd.slice(1).toLowerCase()
    else 
      k += ' ' + wd.charAt(0).toUpperCase() + (extp.dot?'.':'')
  }
  this._txt = k.trim()
  // this._sendToOut('card')
  return this
}

/**
 * Função de uso interta
 */
RenaME.prototype.getPosName = function (n, ev) {
  var b = this._txt_u
  if (b[n])
    this._txt = b[n]
  else
    this._txt
  if (this._autoCapitalize) {
    this.capitalize()
  }
  // this._sendToOut(ev)
  return this
}

/**
 * Descrição: Obtem o primeiro nome
 */
RenaME.prototype.getFirstName = function () {
  return this.getPosName(0, 'firstn')
}

/**
 * Descrição: Obtem o nome do meio
 */
RenaME.prototype.getMiddleName = function () {
  var aux = this._txt_u ? Math.floor(this._txt_u.length / 2) : []
  
  this._txt = this._txt_u.length % 2 === 0 ? this._txt_u[aux - 1] : this._txt_u[aux]

  if (this._autoCapitalize) {
    this.capitalize()
  }
  // this._sendToOut(ev)
  return this
}

/**
 * Descrição: Obtem o último nome
 */
RenaME.prototype.getLastName = function () {
  return this.getPosName((this._txt_u.length-1), 'lastn')
}

/**
 * Desc: Envia o texto que está mantido no objeto como retorno
 */
RenaME.prototype.toString = function () {
  return this._txt
}