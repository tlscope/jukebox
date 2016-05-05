/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add:function(req,res){
		res.view();
	},
	create:function(req,res){
		Customer.create(req.params.all(),function(err,customer){
			res.redirect('/customer/all');
		});
	},
	all:function(req,res){
		Customer.find(function(err,customers){
			res.view({
				customers:customers
			});
		});
	}

};

