const express = require('express');
const exphbs = require('express-handlebars');
// const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();

// Settings
app.set('port', process.env.PORT || 3002);
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        when: (operand_1, operator, operand_2, options) => {
            let operators = { //  {{#when <operand1> 'eq' <operand2>}}
                'eq': (l, r) => l == r, //  {{/when}}
                'noteq': (l, r) => l != r,
                'gt': (l, r) => (+l) > (+r), // {{#when var1 'eq' var2}}
                'gteq': (l, r) => ((+l) > (+r)) || (l == r), //               eq
                'lt': (l, r) => (+l) < (+r), // {{else when var1 'gt' var2}}
                'lteq': (l, r) => ((+l) < (+r)) || (l == r), //               gt
                'or': (l, r) => l || r, // {{else}}
                'and': (l, r) => l && r, //               lt
                '%': (l, r) => (l % r) === 0 // {{/when}}
            }
            let result = operators[operator](operand_1, operand_2);
            if (result) return options.fn(this);
            return options.inverse(this);
        }
    }
}));
app.set('view engine', 'hbs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));


// Routes
app.use(require('./routes/routes.js'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

//Email configuration 

// Server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});