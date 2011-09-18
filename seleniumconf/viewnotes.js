// types
function (doc) { 
  if (doc.report_type) { 
    emit(doc.report_type, 1) 
  } 
}

// tests
function (doc) { 
  if (doc.report_type && doc.results) { 
    emit(doc.report_type, doc.results.length);
  } 
}

// newfails
function (doc) { 
  if (!doc.results) return; 
  doc.results.forEach(function (r) { 
    var i = r.filename.indexOf('/tests/') 
    if (i === -1) { 
      i = r.filename.indexOf('\\tests\\') 
    } 
    var filename = r.filename.slice(i)	 
    emit([ doc.report_type
         , doc.system_info.system
         , filename+'/'+r.name
         , doc.platform_buildid
         ], !r.fails.length) }) 
  }
}

// hasfails
function (doc) { 
  if (doc.tests_failed) emit(doc.time_start, 1); 
}