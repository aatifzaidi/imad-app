var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user:'aatifsuntech',
    database:'aatifsuntech',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
        'article-one': {
                    title: 'Article One | Aatif Zaidi',
                    heading:'Article One',
                    date:'February 18, 2018',
                    content:`       <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non posuere arcu, non maximus tellus. Nunc eu sagittis metus, id tincidunt elit. Nulla in orci et enim consequat porta hendrerit vulputate massa. Quisque suscipit consequat eros quis blandit. Suspendisse luctus, diam vel dapibus molestie, urna arcu imperdiet tellus, eget egestas leo risus nec lacus. Curabitur sem enim, ultrices eu lacus id, ullamcorper placerat eros. Suspendisse finibus interdum nibh a vehicula. Fusce id egestas turpis. Suspendisse id varius libero. Pellentesque dictum varius sapien, vestibulum ultrices lacus bibendum sed. Donec ac lectus ultrices, euismod libero non, auctor augue. Proin finibus nisi vitae ante faucibus egestas. Morbi sed orci id ipsum tempus cursus. Aliquam sed sollicitudin nunc, id tincidunt risus.
                                    </p>
                                    
                                    <p>
                                        Phasellus porta elit eu lacus fringilla tincidunt. In hac habitasse platea dictumst. Suspendisse potenti. Curabitur suscipit nisl vitae arcu tristique, eget sodales nibh congue. Cras euismod sollicitudin dui. Sed egestas vestibulum ante, nec dapibus justo facilisis sed. Fusce pretium nisl non leo mattis, ut pharetra dui aliquet. Cras ultricies quam felis, ut semper est sodales nec. Vivamus laoreet, eros et gravida elementum, ligula neque tempus lacus, vel aliquet quam arcu et felis. Aliquam eleifend arcu ultrices vestibulum egestas. Fusce sollicitudin lectus eu diam sollicitudin imperdiet. Fusce sagittis sem eu justo tincidunt iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis vel malesuada elit, eget iaculis sem. Praesent ligula eros, accumsan nec tortor ac, cursus vestibulum tortor. Integer pulvinar lorem at est tristique, vulputate sodales quam feugiat.
                                    </p>
                        
                                    <p>
                                        Nam semper metus leo, at fringilla metus dignissim ac. Sed eget venenatis nisi. Nam a nisi id justo gravida lacinia eget eget nulla. Nulla nec dui eget metus facilisis facilisis. Nam blandit arcu orci, nec placerat sapien varius eu. Duis mi neque, tincidunt vitae commodo a, dictum ac neque. Aliquam tincidunt scelerisque euismod.
                                    </p>
                                    
                                    <p>
                                        Nam non ligula eget mi rhoncus malesuada. Maecenas eget vestibulum quam. Aenean mollis auctor bibendum. Nunc vitae lorem a purus finibus gravida. Cras pharetra laoreet ipsum et lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin et dapibus turpis, vitae consequat elit. Etiam vitae ipsum ac urna consequat fringilla. Nam vitae nibh eu ante pharetra interdum.
                                    </p>
                                    
                                    <p>
                                        Pellentesque efficitur iaculis turpis id accumsan. Sed id placerat dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In fringilla consequat blandit. Etiam facilisis porttitor facilisis. Vivamus et auctor risus. Quisque nunc sapien, vulputate ac consequat a, varius ac nisl. In vulputate est consectetur, gravida dui vel, posuere tortor. Mauris libero augue, interdum vitae nibh in, efficitur condimentum leo. Integer lacus risus, molestie luctus lorem sollicitudin, sodales pellentesque nunc. Nunc massa mi, lobortis quis sollicitudin non, facilisis in mauris. Vestibulum lobortis dui sed dapibus viverra. Praesent facilisis, dui ut consectetur posuere, quam risus luctus tortor, faucibus rhoncus elit odio ut nisi. Proin rutrum eget neque ac viverra.
                                    </p>`
            
            
                },
                
        'article-two': {
                    title: 'Article Two | Aatif Zaidi',
                    heading:'Article Two',
                    date:'February 19, 2018',
                    content:`       <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non posuere arcu, non maximus tellus. Nunc eu sagittis metus, id tincidunt elit. Nulla in orci et enim consequat porta hendrerit vulputate massa. Quisque suscipit consequat eros quis blandit. Suspendisse luctus, diam vel dapibus molestie, urna arcu imperdiet tellus, eget egestas leo risus nec lacus. Curabitur sem enim, ultrices eu lacus id, ullamcorper placerat eros. Suspendisse finibus interdum nibh a vehicula. Fusce id egestas turpis. Suspendisse id varius libero. Pellentesque dictum varius sapien, vestibulum ultrices lacus bibendum sed. Donec ac lectus ultrices, euismod libero non, auctor augue. Proin finibus nisi vitae ante faucibus egestas. Morbi sed orci id ipsum tempus cursus. Aliquam sed sollicitudin nunc, id tincidunt risus.
                                    </p>
                                    
                                    <p>
                                        Phasellus porta elit eu lacus fringilla tincidunt. In hac habitasse platea dictumst. Suspendisse potenti. Curabitur suscipit nisl vitae arcu tristique, eget sodales nibh congue. Cras euismod sollicitudin dui. Sed egestas vestibulum ante, nec dapibus justo facilisis sed. Fusce pretium nisl non leo mattis, ut pharetra dui aliquet. Cras ultricies quam felis, ut semper est sodales nec. Vivamus laoreet, eros et gravida elementum, ligula neque tempus lacus, vel aliquet quam arcu et felis. Aliquam eleifend arcu ultrices vestibulum egestas. Fusce sollicitudin lectus eu diam sollicitudin imperdiet. Fusce sagittis sem eu justo tincidunt iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis vel malesuada elit, eget iaculis sem. Praesent ligula eros, accumsan nec tortor ac, cursus vestibulum tortor. Integer pulvinar lorem at est tristique, vulputate sodales quam feugiat.
                                    </p>
                        
                                    <p>
                                        Nam semper metus leo, at fringilla metus dignissim ac. Sed eget venenatis nisi. Nam a nisi id justo gravida lacinia eget eget nulla. Nulla nec dui eget metus facilisis facilisis. Nam blandit arcu orci, nec placerat sapien varius eu. Duis mi neque, tincidunt vitae commodo a, dictum ac neque. Aliquam tincidunt scelerisque euismod.
                                    </p>
                                    
                                    <p>
                                        Nam non ligula eget mi rhoncus malesuada. Maecenas eget vestibulum quam. Aenean mollis auctor bibendum. Nunc vitae lorem a purus finibus gravida. Cras pharetra laoreet ipsum et lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin et dapibus turpis, vitae consequat elit. Etiam vitae ipsum ac urna consequat fringilla. Nam vitae nibh eu ante pharetra interdum.
                                    </p>
                                    
                                    <p>
                                        Pellentesque efficitur iaculis turpis id accumsan. Sed id placerat dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In fringilla consequat blandit. Etiam facilisis porttitor facilisis. Vivamus et auctor risus. Quisque nunc sapien, vulputate ac consequat a, varius ac nisl. In vulputate est consectetur, gravida dui vel, posuere tortor. Mauris libero augue, interdum vitae nibh in, efficitur condimentum leo. Integer lacus risus, molestie luctus lorem sollicitudin, sodales pellentesque nunc. Nunc massa mi, lobortis quis sollicitudin non, facilisis in mauris. Vestibulum lobortis dui sed dapibus viverra. Praesent facilisis, dui ut consectetur posuere, quam risus luctus tortor, faucibus rhoncus elit odio ut nisi. Proin rutrum eget neque ac viverra.
                                    </p>`
            
            
                },
                
        'article-three': {
                    title: 'Article Three | Aatif Zaidi',
                    heading:'Article Three',
                    date:'February 20, 2018',
                    content:`       <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non posuere arcu, non maximus tellus. Nunc eu sagittis metus, id tincidunt elit. Nulla in orci et enim consequat porta hendrerit vulputate massa. Quisque suscipit consequat eros quis blandit. Suspendisse luctus, diam vel dapibus molestie, urna arcu imperdiet tellus, eget egestas leo risus nec lacus. Curabitur sem enim, ultrices eu lacus id, ullamcorper placerat eros. Suspendisse finibus interdum nibh a vehicula. Fusce id egestas turpis. Suspendisse id varius libero. Pellentesque dictum varius sapien, vestibulum ultrices lacus bibendum sed. Donec ac lectus ultrices, euismod libero non, auctor augue. Proin finibus nisi vitae ante faucibus egestas. Morbi sed orci id ipsum tempus cursus. Aliquam sed sollicitudin nunc, id tincidunt risus.
                                    </p>
                                    
                                    <p>
                                        Phasellus porta elit eu lacus fringilla tincidunt. In hac habitasse platea dictumst. Suspendisse potenti. Curabitur suscipit nisl vitae arcu tristique, eget sodales nibh congue. Cras euismod sollicitudin dui. Sed egestas vestibulum ante, nec dapibus justo facilisis sed. Fusce pretium nisl non leo mattis, ut pharetra dui aliquet. Cras ultricies quam felis, ut semper est sodales nec. Vivamus laoreet, eros et gravida elementum, ligula neque tempus lacus, vel aliquet quam arcu et felis. Aliquam eleifend arcu ultrices vestibulum egestas. Fusce sollicitudin lectus eu diam sollicitudin imperdiet. Fusce sagittis sem eu justo tincidunt iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis vel malesuada elit, eget iaculis sem. Praesent ligula eros, accumsan nec tortor ac, cursus vestibulum tortor. Integer pulvinar lorem at est tristique, vulputate sodales quam feugiat.
                                    </p>
                        
                                    <p>
                                        Nam semper metus leo, at fringilla metus dignissim ac. Sed eget venenatis nisi. Nam a nisi id justo gravida lacinia eget eget nulla. Nulla nec dui eget metus facilisis facilisis. Nam blandit arcu orci, nec placerat sapien varius eu. Duis mi neque, tincidunt vitae commodo a, dictum ac neque. Aliquam tincidunt scelerisque euismod.
                                    </p>
                                    
                                    <p>
                                        Nam non ligula eget mi rhoncus malesuada. Maecenas eget vestibulum quam. Aenean mollis auctor bibendum. Nunc vitae lorem a purus finibus gravida. Cras pharetra laoreet ipsum et lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin et dapibus turpis, vitae consequat elit. Etiam vitae ipsum ac urna consequat fringilla. Nam vitae nibh eu ante pharetra interdum.
                                    </p>
                                    
                                    <p>
                                        Pellentesque efficitur iaculis turpis id accumsan. Sed id placerat dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In fringilla consequat blandit. Etiam facilisis porttitor facilisis. Vivamus et auctor risus. Quisque nunc sapien, vulputate ac consequat a, varius ac nisl. In vulputate est consectetur, gravida dui vel, posuere tortor. Mauris libero augue, interdum vitae nibh in, efficitur condimentum leo. Integer lacus risus, molestie luctus lorem sollicitudin, sodales pellentesque nunc. Nunc massa mi, lobortis quis sollicitudin non, facilisis in mauris. Vestibulum lobortis dui sed dapibus viverra. Praesent facilisis, dui ut consectetur posuere, quam risus luctus tortor, faucibus rhoncus elit odio ut nisi. Proin rutrum eget neque ac viverra.
                                    </p>`
                    
            
                }
};

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content =data.content;
    
    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        
        
        <body>
                    <div class="container">
                        
                    <div>
                        <a href="/">Home</a>
                    </div>
                    
                    <hr/>
                    
                    <h3>
                        ${heading}
                    </h3>
                    
                    <div>
                        ${date}
                    </div>
                    
                    <div>
                        ${content}
                    </div>
                    </div>
        </body>
    </html>

    `;
    return htmlTemplate;
}

var pool = new Pool(config);
app.get('/test-db', function(req,res){
    //make a select response
    //return a response with the results
    pool.query('SELECT * FROM emp',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else {
            res.send(JSON.stringify(result));
        }
        
    });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter+1;
  res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req,res){
   var name = req.query.name;
   
   names.push(name);
   
   res.send(JSON.stringify(names));
});

app.get('/:articleName',function (req, res){
    //Here, articleName = article-one
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName])); 
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
