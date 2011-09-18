var request = function (options, callback) {
  options.success = function (obj) {
    callback(null, obj);
  }
  options.error = function (err) {
    if (err) callback(err);
    else callback(true);
  }
  if (options.data && typeof options.data == 'object') {
    options.data = JSON.stringify(options.data);
  }
  if (!options.dataType) options.processData = false;
  if (!options.dataType) options.contentType = 'application/json';
  if (!options.dataType) options.dataType = 'json';
  return $.ajax(options);
}

$.expr[":"].exactly = function(obj, index, meta, stack){ 
  return ($(obj).text() == meta[3]);
}

var param = function( a ) {
  // Query param builder from jQuery, had to copy out to remove conversion of spaces to +
  // This is important when converting datastructures to querystrings to send to CouchDB.
	var s = [];
	if ( jQuery.isArray(a) || a.jquery ) {
		jQuery.each( a, function() { add( this.name, this.value ); });		
	} else { 
	  for ( var prefix in a ) { buildParams( prefix, a[prefix] ); }
	}
  return s.join("&");
	function buildParams( prefix, obj ) {
		if ( jQuery.isArray(obj) ) {
			jQuery.each( obj, function( i, v ) {
				if (  /\[\]$/.test( prefix ) ) { add( prefix, v );
				} else { buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "") +"]", v )}
			});				
		} else if (  obj != null && typeof obj === "object" ) {
			jQuery.each( obj, function( k, v ) { buildParams( prefix + "[" + k + "]", v ); });				
		} else { add( prefix, obj ); }
	}
	function add( key, value ) {
		value = jQuery.isFunction(value) ? value() : value;
		s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	}
}

var app = {};
app.index = function () {
  $('body').html('')
  request({url:'/api/_design/r/_view/types?group=true'}, function (e, resp) {
    resp.rows.forEach(function (row) {
      $('body').append('<div><a href="/#/'+row.key+'">'+row.key+'</a>  '+row.value+'</div>')
    })
  })
};

app.bytype = function () {
  $('body').html('');
  var type = this.params.type;
  request({url:'/api/_design/r/_view/types?reduce=false&key="'+type+'"'}, function (e, resp) {
    resp.rows.forEach(function (row) {
      $('body').append('<div><a href="/#/test/'+row.id+'">'+row.id+'</a>  </div>')
    })
  })
}

app.showdoc = function () {
  $('body').html('');
  var id = this.params.id;
  request({url:'/api/'+id}, function (e, doc) {
    
    doc.results.forEach(function (r) {
      if (r.fails.length) {
        var i = r.filename.indexOf('/tests/')
        if (i === -1) {
          i = r.filename.indexOf('\\tests\\')
        }
        var filename = r.filename.slice(i)
        
        var fail = $('<div>'+r.filename+'</div>');
        $('body').append(fail)
        
        var startkey = [doc.report_type, doc.system_info.system, filename+'/'+r.name, doc.platform_buildid]
        console.log(startkey)
        request({url:'/api/_design/r/_view/newfails?limit=2&descending=true&startkey='+JSON.stringify(startkey)}, function (e, resp) {
          
          
          if (resp.rows[1].key[2] != filename+'/'+r.name) {
            console.log(resp.rows[1].key[2], filename, r.name)
            return;
          }
          fail.append('<span>    '+resp.rows[1].value+'</span>')
        })
       }
    })
    
    $('body').append('<pre>'+JSON.stringify(doc, null, 2)+'</pre>')
  })
}


app.newfails = function () {
  $('body').html('');
  request({url:'/api/_design/r/_view/hasfails?descending=true&limit=100'}, function (e, resp) {
    resp.rows.forEach(function (row) {
      var test = $('<div>'+row.key+'   <a href="/#/test/'+row.id+'">'+row.id+'</a></div>')
      $('body').append(test)
      request({url:'/api/'+row.id}, function (e, doc) {
        test.append(doc.tests_failed);
        doc.results.forEach(function (r) {
          if (r.fails.length) {
            var i = r.filename.indexOf('/tests/')
            if (i === -1) {
              i = r.filename.indexOf('\\tests\\')
            }
            var filename = r.filename.slice(i)
            var startkey = [doc.report_type, doc.system_info.system, filename+'/'+r.name, doc.platform_buildid]
            request({url:'/api/_design/r/_view/newfails?limit=2&descending=true&startkey=' + 
                     JSON.stringify(startkey)}, function (e, resp) {
              if (resp.rows[1].key[2] != filename+'/'+r.name) {
                console.log(resp.rows[1].key[2], filename, r.name)
                return;
              }       
                     
              if (resp.rows[1].value) {
                test.append('<span>   new!</div>')
              }
            })
          }
        })
      })
    })
  })
}

$(function () { 
  app.s = $.sammy(function () {
    // Index of all databases
    this.get('', app.index);
    this.get("#/", app.index);
    this.get('#/newfails', app.newfails);
    this.get('#/:type', app.bytype);
    this.get('#/test/:id', app.showdoc);
    
  })
  app.s.run();
});
