module.exports = {
	dev:{
		name:'dev',
		port: 8080,
		prerender:'XPdveyRC2Culd1voem03',
		baseDir:'public',
		serveDir:'/public/index.html'
	},
	staging:{
		name:'staging',
		port: 8080,
		prerender:'XPdveyRC2Culd1voem03',
		baseDir:'dist',
		serveDir:'/dist/index.html'
	},
	production:{
		name:'production',
		port: 8080,
		prerender:'XPdveyRC2Culd1voem03',
		baseDir:'dist',
		serveDir:'/dist/index.html'
	}
};