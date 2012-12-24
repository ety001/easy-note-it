exports.getNote = function(req, res){
	if(req.session.user){
		
	}
	res.render('note_list', {
		title: 'Easy Note It',
		msg: req.flash('msg')
	});
};