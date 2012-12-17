
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('note_list', { title: 'Easy Note It' });
};