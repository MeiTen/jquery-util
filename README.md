# jquery-util
Wrapper libraly for jQuery. It is available to use javascript as Java. e.g: Define class. Extend class.

## Dependencies

- jQuery

## Functions

- jQuery Wrapper functions
- Input forms (button, text, select ...)
- Navigator
- Tracking Panel
- Tooltip

## Usage

### Example

- index.html
```html
<script type="text/javascript" src="../cmn/js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="../cmn/js/common.js"></script>
<link rel="stylesheet" type="text/css" href="../cmn/css/common.css" />
<script>
/* Define Class */
var Person = $.Class.create({
    initialize: function(name, age) {
        this.name = name;
        this.age = age;
    },

    getName: function(){
        return this.name;
    },

    getAge: function() {
        return this.age;
    },

    'self::getDummyName' : function() {
        return 2123;
    }
});

/* Extend Class */
var SuperMan = $.Class.create(Person, {
    initialize: function(name, age, power) {
        this.name = name;
        this.age = age;
        this.power = power;
    },

    getName: function() {
        return '[SUPER]::' + this.name;
    },

    'self::getDummyName' : function() {
        return 999;
    }
});

/* Generate Class */
var personA = new Person('taro', 23);
var personB = new Person('hanako', 12);

/* Generate Extended Class */
var superA = new SuperMan('taro', 23, 999);
var superB = new SuperMan('hanako', 12, 10);
</script>

<body>
<div id="content">

<!-- Sample of　Navigator -->
<div class="navigator" id="cmn-navigator-id-j">
    <div class="arrow-base">
        <div class="arrow current large-font">
            <span>Navi Large 1</span>
        </div>
    </div>
    <div class="arrow-base">
        <div class="arrow enabled large-font">
            <span>Navi Large 2</span>
        </div>
    </div>
    <div class="arrow-base">
        <div class="arrow disabled large-font">
            <span>Navi Large 3</span>
        </div>
    </div>
</div>

<!-- Sample of flat Tooltip -->
<div id="tool-click-id"  class="tooltip">
    <p>Flat for click</p>
    <button type="button" id="btn-tooltip" class="btn-img tooltip-trigger"></button>
    <dl class="tooltip-flat">
        <dt>Tooltip Title</dt>
        <dd>This is the content of the Tooltip.</dd>
    </dl>
</div>

</div>
</body>
```
### More

- Check 'sample/index.html' and 'sample/js/custom.js', there are more samples.

## Lisence

MIT

