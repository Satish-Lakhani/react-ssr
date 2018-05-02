export default ({ markup, helmet }) => {
	return `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
<head>
  <meta charset="utf-8" >
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  ${helmet.link.toString()}
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="/styles/css.bundle.css" />
</head>
<body ${helmet.bodyAttributes.toString()}>
  <div id="app">${markup}</div>
  <script src="/javascripts/vendor.js"></script>
  <script src="/javascripts/app.js" async></script>
</body>
</html>`;
};
