/**
 * @fileOvervie Wrapper libraly for jQuery.
 *  Able to use js as Java. ex) define and extend class.
 * 
 * @author MeiTen
 * @version 1.0.0
 *
 */

$(function(){

    /**
     * [Extend jQuery]
     *
     * @classdesc Class for extending jQuery functions.
     */
    $.jQueryClass = function(){};

    /**
     * Extend jQuery functions.
     *
     * @description
     * If you want to generate NO EXTEND CLASS, 
     * plese set the prototype object of child class to the first argument. 
     *
     * ## Naming Rule
     *  public function - lowweCamelCase - [action＋target] 
     *  private function - "_" + lowweCamelCase -  "_" + [action＋target] 
     *
     *  You can call parent's function by writing [this._super()].
     *
     * @example
     * ## Generate an indipendent class.
     *
     * $.fn.changeColor = $.jQueryClass.create({
     *     red : function(){
     *         this.css('color', 'red');
     *         return this;
     *     },
     *  
     *    green : function(){
     *         this.css('color', 'green');
     *         return this;
     *     }
     * });
     *
     * @example
     * ## Generate a child class that inherits the parent class.
     *
     * $.fn.exChangeColor = $.jQueryClass.create($.fn.changeColor, {
     *     blue : function(){
     *         this.css('color', 'blue');
     *         return this;
     *     }
     * });
     *
     * @example
     * ## Call the parent's function.
     *
     * $.fn.exChangeColor = $.jQueryClass.create($.fn.changeColor, {
     *     green : function(){
     *         return this._super();
     *     }
     * });
     */
    $.jQueryClass.create = function(parent, child){
        var initializing = false;
        if(typeof parent == 'function') {
            parent = parent();
        }
        initializing = true;
        
        var _super = $.extend({}, parent);
        
        var prototype = $.extend({}, parent, child);
        
        // Generate a function that calls override function.
        function callOverrideMethod(name, fn) {
            return function() {
                var tmp = this._super;
                this._super = _super[name];
                var ret = fn.apply(this, arguments);
                
                this._super = tmp;
                
                return ret;
            };
        }

        // call parent's function by [this._super()].
        for(var name in child){
            if(typeof _super[name] == 'function') {
                prototype[name] = callOverrideMethod(name, child[name]);
            }
        }
        
        return function() {
            // extend prototype which is definded above.
            var self = $.extend([], this, prototype);
            
            if(initializing && self.initialize) {
                self.initialize.apply(self, arguments);
            }
            
            return self;
        };
    };

    /**
     * Common item Class
     *
     * @classdesc Class that provides a general-purpose parts common processing。
     * 
     */
    $.fn.cmn = $.jQueryClass.create({

        /**
         * @constructor
         */
        initialize: function(){
            this.TARGET_PROP = 'input, textarea, select, option, button';
        },         

        /**
         * Wrap function of jQuery.val()
         *
         * @param {String} val set text to attribute of Value.
         *
         * @return {jQuery} Dom
         */
        setVal : function(val) {
            $(this).val(val);
            return this;
        },
        
        /**
         * Wrap function of jQuery.val()
         *
         * @return {jQuery} attribute of Value
         */
        getVal : function() {
            return $(this).val();
        },

        /**
         * Wrap function of jQuery.prop()
         *
         * @param {String} prop propaty(selected／checked／disabled／multiple).
         * @param {boolean} flg  true: add propaty false: del propaty
         *
         * @return {jQuery} Dom
         */
        setProp : function(prop, flg) {

            if ((prop !== undefined) &&
                (flg !== undefined)) {
                if ($(this).is(this.TARGET_PROP)) {
                    $(this).prop(prop, flg);
                }
            }

            return this;
        },

        /**
         * Wrap function of jQuery.prop()
         *
         * @param {String} prop propaty(selected／checked／disabled／multiple).
         *
         * @return {jQuery} true: add propaty false: del propaty
         */
        hasProp : function(prop) {

            var ret = false;

            if (prop !== undefined) {
                ret = $(this).prop(prop) ? true : false;                
            }

            return ret;
            
        },

        /**
         * Wrap function of jQuery.addClass(), removeClass()
         *
         * @param {String} cls class name
         * @param {boolean} flg  true: add false: del
         *
         * @return {jQuery} Dom
         */
        setClass :  function(cls, flg) {

            // パラメタが指定されていない場合は何もしない
            if ((cls !== undefined) &&
                (flg !== undefined)) {

                // 子要素は含めない
                if( flg ) {
                    $(this).addClass(cls);
                } else {
                    $(this).removeClass(cls);
                }
            }           
            return this;
        },

        /**
         * jucge if the element has specified class or not. 
         *
         * @param {RegExp} reg Class name defined in the regular expression
         * @see jQuery.hasClass
         */
        hasClass : function (reg) {

            if (reg instanceof RegExp === false) {
                return $(this).hasClass(reg);
            }

            var i = 0;
            var len = this.length;

            for (; len > i; i++) {
                if (  (1 === this[i].nodeType) && 
                      (' ' + this[i].className + ' ').replace(/\W/, ' ').match(reg) ){
                     return true;
                }
            }
            return false;
        },
        
        /**
         * Wrap function of jQuery.text()
         *
         * @return {String} text of the element.
         */
        getText : function() {
            return $(this).text();
        },
         
        /**
         * Wrap function of jQuery.text()
         *
         * @param {String} txt text of the element.
         *
         * @return {jQuery} Dom
         */
        setText : function(txt) {
            $(this).text(txt);
            return this;
        },

        /**
         * Get the child elements which have specified property.
         *
         * param {String} prop property name ('checked', 'disabled' ···)
         *
         * return {Array. <JQuery>} the array of elements that contains specified property.
         */
        findProp :  function(prop) {

            var array = [];
            if (prop === undefined) {
                return array;
            }

            var $target = $(this).find(this.TARGET_PROP);

            array = $target.filter(function() {
                return $(this).prop(prop);
            });

            return array;
            
        },

        /**
         * 指定クラスが設定された子孫要素を取得する。
         *
         * @param {String} cls クラス名('cls-name')
         *
         * @return {Array.<jQuery>} 子孫要素のうち、指定のクラスが指定されていた要素のArray
         *
         */
        findClass :  function(cls) {

            return $(this).find('.' + cls);
            
        },

        /**
         * 要素を表示する。<br>
         * jQuery.show()のラップ機能。
         *
         * @return {jQuery} 自身のDOM Element
         *
         */
        show: function() {
            return $(this).show();
        },

        /**
         * 要素を非表示にする<br>
         * jQuery.hide()のラップ機能。
         *
         * @return {jQuery} 自身のDOM Element
         *
         */
        hide: function() {
            return $(this).hide();
        },

        /**
         * 要素の表示・表示状態を取得する。
         *
         * @return {boolean} true: 表示、false: 非表示
         *
         */
        isShow : function() {
            return $(this).css('display') != 'none';
        },

        /**
         * Inactive・Activeを設定する
         *
         * @param {boolean} flg - 設定値。 true: true、 false: false
         *
         * @return {jQuery} 自身のDOM Element
         *
         */
        setDisabled : function(flg) {

            // 属性値'disabled'の設定
            $(this).cmn().setProp('disabled', flg);
            // 子孫要素も対象
            $(this).find(this.TARGET_PROP).prop('disabled', flg);

            // クラス'.disabled'の設定
            // labelはdisabled属性値を.prop()で指定できないため
            if ($(this).is('label')) {
                $(this).cmn().setClass('disabled', flg);
            } else if ($(this).parent().is('label')) {
                // Checkbox、 Radio  ButtonはParent elementのlabelまで設定する必要がある
                $(this).parent().cmn().setClass('disabled', flg);
            }
            // 子孫要素も対象
            $(this).find('label').cmn().setClass('disabled', flg);

            return this;
        },

        /**
         * Inactive状態か否かを取得する。
         *
         * @return {boolean} Inactive状態か否か。true: Inactive false: Active。
         *
         */
        isDisabled : function() {
            return $(this).prop('disabled') ? true : false;
        },

        /**
         * Invert bg colorスタイルクラスを設定する
         *
         * @see setClass()
         *
         */
        setValErr : function(flg) {
            return this.setClass('val-err', flg);
        },

        /**
         * Invert bg colorスタイルクラスを Clearする
         *
         * @see setValErr()
         *
         */
        clearValErr : function() {
            return this.setValErr(false);
        },

        /**
         * Invert bg color状態か否かを取得する
         *
         * @return {boolean} Invert bg color状態か否か。true: Invert bg color状態 false: 通常状態。
         *
         */
        isValErr : function() {
            return this.hasClass('val-err');
        }

    });

    /**
     * Common Buttonクラス。
     *
     * @classdesc Common Buttonの処理を提供するクラス。<br>
     * cmnクラスを継承するため、Common 部品共通機能の呼び出しが可能。
     * 
     */
    $.fn.cmnButton = $.jQueryClass.create($.fn.cmn, {

        /**
         * 現在のStringが指定Stringか否かを判定する。
         *
         * @param {String} val  Check 対象String
         *
         * @return {boolean} true: 指定Stringと一致、false: 指定Stringと一致しない
         */
        checkVal : function(val) {
            return ($(this).val() == val);
        },

        /**
         * 表示Stringを Toggle切替する。
         *
         * @param {String} defaultVal 通常時のButtonString
         * @param {String} changeVal 切り替え後のButtonString
         *
         * @return {jQuery} 自身のDOM Element
         */
        toggleVal : function(defaultVal, changeVal) {
            var toggleVal = this.checkVal(defaultVal) ? changeVal : defaultVal; 
            return this.setVal(toggleVal);
        }

    });

    /**
     * Common Textボックスクラス。
     *
     * @classdesc Common Textボックスの処理を提供するクラス。<br>
     * cmnクラスを継承するため、Common 部品共通機能の呼び出しが可能。
     * 
     */
    $.fn.cmnText = $.jQueryClass.create($.fn.cmn, {
       

    });

    /**
     * Common Drop Down Listクラス。
     *
     * @classdesc Common Drop Down Listの処理を提供するクラス。<br>
     * cmnクラスを継承するため、Common 部品共通機能の呼び出しが可能。
     * 
     */
    $.fn.cmnSelect = $.jQueryClass.create($.fn.cmn, {
       
        /**
         * 選択された子孫要素を取得する。<br>
         * 選択された子孫要素がMultiの場合は先頭の要素を返却する。
         *
         * @return {jQuery} 子孫要素のうち、選択された要素（選択された要素がない場合はnull）
         */
        getSelectedOption : function() {
            var list = this.getSelectedOptionList();

            if (list.length > 0) {
                return $(list[0]);
            }

            return null;
        },
       
        /**
         * 選択された子孫要素のArrayを取得する。
         *
         * @return {Array.<jQuery>} 子孫要素のうち、選択された要素のArray
         */
        getSelectedOptionList : function() {
            return $(this).find('option:selected');
        },
       
        /**
         * Drop Down Listの要素Arrayを追加する。
         *
         * @param optList {Array.<String>} 「<option></option>で構成されるHTMLString」のArray。ドロップダウンに追加される。
         * @param position Number または {jQuery} 挿入場所。先頭（0）、末尾（1）、もしくは指定のDOM Elementの後ろを指定する。
         *
         * @return {jQuery} 自身のDOM Element
         */
        addOptionList : function(optList, position) {

            // Arrayでなければ終了
            if (!$.isArray(optList)) {
                return this;
            }

            return this._addOption(optList.join(''), position);

        },
        
        /**
         * Drop Down Listの要素を追加する。
         *
         * @param val {String} <option value=””>に設定する値。
         * @param txt {String} <option></option>の間に設定するString。
         * @param position Number または {jQuery} 挿入場所。先頭（0）、末尾（1）、もしくは指定のDOM Elementの後ろを指定する。
         *
         * @return {jQuery} 自身のDOM Element
         */
        addOption : function(val, txt, position) {
            return this._addOption($('<option>').html(txt).val(val), position);
        },
      
        /**
         * Drop Down Listの要素を削除する。
         *
         * @param opt {String} または {jQuery} 削除対象の<option value=””>の値、もしくはDOM Element。
         *
         * @return {jQuery} 自身のDOM Element
         */
        removeOption : function($opt) {

            // String
            if (typeof $opt === 'string') {

                $(this).find('option[value=' + $opt + ']').remove();

            // DOM Element
            } else if (
                $opt !== undefined &&
                $opt.length > 0 &&
                $opt[0].nodeType === 1) {
                
                $(this).find($opt).remove();

            }

            return this;
        },

        /**
         * ドロップダウンの選択を解除する。
         *
         * @return {jQuery} 自身のDOM Element
         */
        reset : function() {
            return $(this).find('option:selected').prop('selected', false); 
        },


        /**
         * Drop Down Listの要素を追加する。
         * @private
         */
        _addOption : function($opt, position) {

            // 先頭
            if (position === 0) {
                $(this).prepend($opt);
            // 末尾
            } else if (position === 1) {
                $(this).append($opt);
            // 指定DOM Element かつ option要素の場合
            } else if (position !== undefined && 
                        position[0].nodeType === 1 &&
                        position.is('option')) {
                position.after($opt);
            }

            return this;

        }

    });

     /**
     * Common  Radio  Buttonクラス。
     *
     * @classdesc Common  Radio  Buttonの処理を提供するクラス。<br>
     * cmnクラスを継承するため、Common 部品共通機能の呼び出しが可能。
     *
     *  Check 状態を解除を行った際もchangeイベントを通知するようにしています。
     */
    $.fn.cmnRadio = $.jQueryClass.create($.fn.cmn, {
       
        initialize: function() {
            this._super();
            /**  Check 状態の Radio  Buttonをラップしている要素のクラス名 */
            this._WRAP_CHECKED_CLASS = 'checked';
        },
               
        /**
         * イベント処理のセットアップを行う。
         */
        setup : function() {
            this._attachedEvent();
        },
       
        /**
         * 選択された子要素を取得する。
         *
         * @return {Array.<jQuery>} 子要素のうち、選択された要素のArray（選択された要素がない場合はnull）
         */
        getCheckedNode : function() {
            // input要素を取得
            var list = this.findProp('checked');

            if (list.length > 0) {
                return $(list[0]);
            }

            return null;

        },

        /**
         * Selectedの要素をすべて解除する。
         *
         * @return {jQuery} 自身のDOM Element
         */
        reset : function() {
            // input要素を取得
            var array = this.findProp('checked');

            // 自身が Check 状態であれば解除する。
            if ($(this).prop('checked')) {
                array.push($(this));
            }

            $.each(array, (function() {
                $(this).prop('checked', false);
                // Parent elementのラベルに付与された'checked'クラスも削除する
                $(this).parent().removeClass('checked', false);
            }));

            return this;
        },

        /**
         * クリックイベントを追加
         * クリックで Radio  Button解除可能にする。
         */
        _attachedEvent : function() {

            var self = this;

            $(document).on('click', "[class^=radio-] > input[type='radio']", function(e){
                //クリックした Radio  Buttonがchk-radioクラスを持っていたら Check 状態と判定
                if (self._isChecked(this)) {
                    // クリック対象ノードの Check を外す
                    self._unchecked(this);
                } else {
                    // 同じGroup内の Radio  ButtonをAll未選択にする
                    self._uncheckedAllInGroup(this);
                    // クリック対象ノードに Check を入れる
                    self._checked(this, e);
                }
            });
            
        },

        /**
         * 対象 Radio  Buttonの Check 判定する。
         * 
         * @param node {Element} - 判定対象の Radio  Button
         *
         * @return {boolean}  Check 済みの場合はtrue
         */
        _isChecked : function(node) {
            return $(node).parent().hasClass('checked');
        },

        /**
         * 対象 Radio  Buttonの Check を解除する。
         * 
         * @param node {Element} -  Check 解除対象の Radio  Button
         */
        _unchecked : function(node) {
            $(node).prop('checked', false).trigger('change');
            $(node).parent().removeClass(this._WRAP_CHECKED_CLASS);
        },

        /**
         * 対象 Radio  Buttonを Check する。
         * 
         * @param node {Element} -  Check 対象の Radio  Button
         * @param e {Object} - イベントオブジェクト
         */
        _checked : function(node, e) {
            $(node).prop('checked', true);
            $(node).parent().addClass(this._WRAP_CHECKED_CLASS);
            
            // イベント終了時にprop("checked")が変わっていた場合、changeイベントが通知される仕様のため、
            // イベントからの実行でなければchangeイベントを通知
            if(typeof e === 'undefined') {
               $(node).trigger('change');
            }
        },

        /**
         * 対象 Radio  ButtonのGroup内Allの Check を解除する。
         * 
         * @param node {Element} - 解除対象Groupの Radio  Button
         */
        _uncheckedAllInGroup : function(node) {
            var name = $(node).attr('name');
            $('input[name='+name+']').prop('checked', false)
                .parent().removeClass(this._WRAP_CHECKED_CLASS);
        }
    });

    // Common  Radio  Buttonのイベント処理を初期化
    $(document).cmnRadio().setup();

    /**
     * Common Checkboxクラス。
     *
     * @classdesc Common Checkboxの処理を提供するクラス。<br>
     * cmnRadioクラスを継承するため、Common 部品共通機能の呼び出しが可能。
     * 
     */
    $.fn.cmnCheck = $.jQueryClass.create($.fn.cmnRadio, {
       
        initialize: function() {
            this._super();
        },
        
        /**
         * イベント処理のセットアップを行う。
         */
        setup : function() {
            this._attachedEvent();
        },
        
        /**
         * 選択された子要素をArrayで取得する。
         *
         * @return {Array.<jQuery>} 子要素のうち、選択された要素のArray
         */
        getCheckedNodeList : function() {
            // input要素を取得
            return this.findProp('checked');
        },

        /**
         * クリックイベントを追加
         * クリックでCheckboxの Check ・解除スタイルを設定する。
         */
        _attachedEvent : function() {

            $(document).on('click', "[class^=check-] > input[type='checkbox']", function(){
                
                var parent = $(this).parent();

                if($(this).prop('checked')) {
                    parent.addClass('checked');
                } else {
                    parent.removeClass('checked');
                }
                
            });
            
        }

    });

    // Common Checkboxのイベント処理を初期化
    $(document).cmnCheck().setup();

    /**
     * コンテンツ開閉を行うクラス。
     *
     * @classdesc 呼び出し毎に対象のコンテンツを表示非Switch Displayする。<br>
     *  「Button文字Switch Display部品」と組み合わせて使用する。
     */
    $.fn.accordion = $.jQueryClass.create({

        /**
         * 要素をスライドアップで表示する。<br>
         * jQuery.slideDown()のラップ機能。
         *
         * @return {jQuery} jQuery.Defferedオブジェクト（jQuery Defferedのpromiseオブジェクト）<br>
         * 描画処理の完了を通知するコールバック。スライドアップ・ダウン完了後の処理が必要な場合に使用する。
         */
        show: function() {
            var d = $.Deferred();
            this.slideDown('fast', d.resolve);
            return d.promise();
        },

        /**
         * 要素をスライドダウンで非表示にする。<br>
         * jQuery.slideUp()のラップ機能。
         *
         * @return {jQuery} jQuery.Defferedオブジェクト（jQuery Defferedのpromiseオブジェクト）<br>
         * 描画処理の完了を通知するコールバック。スライドアップ・ダウン完了後の処理が必要な場合に使用する。
         */
        hide: function() {
            var d = $.Deferred();
            this.slideUp('fast', d.resolve);
            return d.promise();
        },

        /**
         * 要素の表示・表示状態を取得する。
         *
         * @return {boolean} true: 表示状態、flase:非表示状態
         */
        isShow: function() {
            return this.css('display') != 'none';
        },
        
        /**
         * 要素のスライドアップとスライドダウンの動作を交互に行う。
         *
         * @return {jQuery} jQuery.Defferedオブジェクト（jQuery Defferedのpromiseオブジェクト）<br>
         * 描画処理の完了を通知するコールバック。スライドアップ・ダウン完了後の処理が必要な場合に使用する。
         */
        toggle : function() {
            return this.isShow() ? this.hide() : this.show();
        }

    });


    /**
     * [jQuery拡張]
     *
     * @classdesc クラスを生成するファクトリークラス
     */
    $.Class = {
        /**
         * クラス生成する
         * @param {Object} Parent - 親クラス
         * @param {PrototypeObject} child - 子クラスのプロトタイプオブジェクト
         *
         * @description
         * 親クラスを継承しないクラスを生成する場合は、
         * 第一引数に子クラスのプロトタイプオブジェクトを設定してください。
         *
         * 「this._super()」で親で定義したメソッドを呼び出すことができます。
         *
         * <命名規約>
         *  publicメソッド - lowweCamelCase -「アクション＋対象物」 
         *  privateメソッド - 「_」 + lowweCamelCase -  「_」 + 「アクション＋対象物」 
         *
         * @example
         * <独立したクラスを生成する>
         *
         * var Person = $.Class.create({
         *      initialize: function(name) {
         *          this.name = name;
         *      },
         *      echo : function() {
         *          console.log(this.name);
         *      }
         * });
         *
         * @example
         * <親クラスを継承した子クラスを生成する>
         *
         * var Man = $.Class.create(Person, {
         *      echo: function() {
         *          console.log("man");
         *      }
         * });
         *
         * @example
         * <親クラスのメソッド呼び出し>
         *
         * var Man = $.Class.create(Person, {
         *     echo: function() {
         *         this._super();
         *         console.log("man");
         *     }
         * });
         *
         * new Man("tarou").echo(); #=> tarou man.
         */
        create: function(parent, child) {
            // 生成するクラスオブジェクト
            // クラス生成時にinitializeを実行するようにする
            var Class = function() {
                if(this.initialize) {
                    this.initialize.apply(this ,arguments);
                }
            };
            
            // オーバーライドstaticメソッドコール時の関数を生成する関数
            function callOverrideStaticMethod(name, fn) {
                return function() {
                    var tmp = this._super;
                    this._super = _superStaticMetods[name];
                    
                    var ret = fn.apply(this, arguments);
                    
                    this._super = tmp;

                    return ret;
                };
            }
            
            // オーバーライドinstanceメソッドコール時の関数を生成する関数
            function callOverrideMethod(name, fn) {
                return function() {
                    var tmp = this._super;
                    this._super = _super[name];
                    
                    var ret = fn.apply(this, arguments);
                    
                    this._super = tmp;

                    return ret;
                }; 
            }
            
            if(typeof child === 'undefined') {
                //-----------------------------
                // 親クラスを定義する
                //-----------------------------
                
                // プロトタイプオブジェクトを設定する
                Class.prototype = parent;
                
                // プロトタイプオブジェクトから
                // 「self::」が先頭につくメソッドを静的メソッドとして定義する
                $.each(parent, function(key, value){
                    if(key.match(/self::(.*)/)){
                        // function であればClassに追加する
                        if (typeof value == 'function') {
                            Class[RegExp.$1] = value;
                        }
                        delete Class.prototype[key];
                    }
                });
                
            } else {
                //-----------------------------
                // サブクラスを定義する
                //-----------------------------
                
                // 親クラスのプロトタイプオブジェクトを保持
                // ※子クラスからクロージャで呼び出される
                var _super = parent.prototype;
                
                // 親クラスの静的メソッドを保持
                // 子クラスからクロージャで呼び出される
                var _superStaticMetods = $.extend({}, parent);
                
                var childStaticMethods = {};

                // プロトタイプオブジェクトから
                // 「self::」が先頭につくメソッドを静的メソッドとして定義する
                $.each(child, function(key, value){
                    if(key.match(/self::(.*)/)){
                        // function であればClassに追加する
                        if (typeof value == 'function') {
                            childStaticMethods[RegExp.$1] = value;
                        }
                        delete child[key];
                    }
                });
                
                // 親クラスの静的メソッドを継承
                var mixinStaticMethods = $.extend({}, parent, childStaticMethods);
                
                // 親クラスの静的メソッドをオーバーライドしている場合
                // 同関数内で"this._super();"を呼び出すことで
                // 親のメソッドを呼べるようにする
                $.each(mixinStaticMethods, function(name, value){
                    Class[name] = value;
                    
                    if(typeof _superStaticMetods[name] == 'function') {
                        Class[name] = callOverrideStaticMethod(name, value);
                    }
                });
                
                // 親のプロトタイプオブジェクトを継承する
                Class.prototype = $.extend({}, parent.prototype, child);
                
                // 親クラスのインスタンスメソッドをオーバーライドしている場合
                // 同関数内で"this._super();"を呼び出すことで
                // 親のメソッドを呼べるようにする
                for(var name in Class.prototype){
                    if(typeof _super[name] == 'function') {
                        Class.prototype[name] = callOverrideMethod(name, Class.prototype[name]);
                    }
                }
                
            }
            
            return Class;
        }
    };

    /**
     *  ユーティリティクラス。(static)
     *
     * @classdesc スタイル変更などのUtility群を定義するクラス。
     */
    $.CmnUtil = $.Class.create({
        
        /**
         * 初期処理
         */
        initialize: function() {
        },

        /**
         * Active・Inactive切替処理を行う。
         *
         * @param {Object} or Array.<jQuery> $target 状態を切り替える対象のDOM Element、もしくは、DOM ElementのArray。<br>
         * 指定要素に子要素が含まれる場合は、子も対象とする。
         * @param boolean flg Inactive状態フラグ true:Inactive、false:Active
         */
        'self::setDisabled' : function($target, flg) {

            // Arrayの場合
            if ( $.isArray($target) ) {
                $.each($target, function() {
                    $(this).cmn().setDisabled(flg);
                });

            // Arrayでない場合
            } else {
                // targetがない場合 または targetがHTMLタグ要素でない場合
                if ($target === undefined || 
                    $target[0] === undefined || 
                    $target[0].nodeType !== 1) {
                    return;
                }
                $target.cmn().setDisabled(flg);
            }

        },

        /**
         * Inactive状態を解除する。
         *
         * @param {jQuery} or Array.<jQuery> $target 状態を解除する対象のDOM Element、もしくは、DOM ElementのArray。<br>
         * 指定要素に子要素が含まれる場合は、子も対象とする。
         */
        'self::clearDisabled' : function($target) {
            this.setDisabled($target, false);
        },

        /**
         * AllのInactive状態を解除する。
         */
        'self::clearDisabledAll' : function() {
            this.setDisabled($('*:disabled'), false);
        },


        /**
         * Inactive状態か否かを取得する。
         *
         * @param {jQuery} or Array.<jQuery> $target 状態を解除する対象のDOM Element、もしくは、DOM ElementのArray。<br>
         * 指定要素に子要素が含まれる場合は、子も対象とする。
         *
         * @return {boolean} Inactive状態か否か。true: Inactive false: Active。
         *
         */
        'self::isDisabled' : function($target) {
            // targetがない場合 または targetがHTMLタグ要素でない場合
            if ($target === undefined || 
                $target[0] === undefined || 
                $target[0].nodeType !== 1) {
                return false;
            }
            return $target.cmn().isDisabled();
        },

        /**
         * エラー時のInvert bg colorの設定を行う。
         *
         * @param {jQuery} or Array.<jQuery> $target
         *         状態を切り替える対象部品IDのノード（jQueryオブジェクト）もしくは、ノードのArray。
         * @param boolean flg 状態フラグ<br>
         *         true:Invert bg color状態、false:Invert bg color解除状態
         * 
         */
        'self::setValErr' : function($target, flg) {

            // Arrayの場合
            if ( $.isArray($target) ) {
                $.each($target, function() {
                    $(this).cmn().setValErr(flg);
                });

            // Arrayでない場合
            } else {
                // targetがない場合 または targetがHTMLタグ要素でない場合
                if ($target === undefined || 
                    $target[0] === undefined || 
                    $target[0].nodeType !== 1) {
                    return;
                }
                $target.cmn().setValErr(flg);
            }
        },

        /**
         * Invert bg color状態を解除する。
         *
         * @param {jQuery} or Array.<jQuery> $target
         *         状態を切り替える対象部品IDのノード（jQueryオブジェクト）もしくは、ノードのArray。
         */
        'self::clearValErr' : function($target) {
            this.setValErr($target, false);
        },

        /**
         * AllのInvert bg color状態を解除する。
         */
        'self::clearValErrAll' : function() {
            var self = this;
            $('.val-err').each(function() {
                self.setValErr($(this), false);
            });
        },

        /**
         * Invert bg color状態か否かを取得する。
         *
         * @param {jQuery} $target 状態を Check する対象部品IDのノード（jQueryオブジェクト）。
         *
         * @return {boolean} Invert bg color状態か否か。true: Invert bg color状態 false: 通常状態。
         */
        'self::isValErr' : function($target) {
            // targetがない場合 または targetがHTMLタグ要素でない場合
            if ($target === undefined || 
                $target[0] === undefined || 
                $target[0].nodeType !== 1) {
                return false;
            }
            return $target.cmn().isValErr();
        },

        /**
         * 指定先にスクロールする。
         *
         * @param {jQuery} $target スクロール先要素IDのノード（jQueryオブジェクト）
         */
        'self::scrollTo' : function($target) {
            //指定要素へスクロール
            var p = 0;
            if ($target !== undefined && 
                $target[0] !== undefined &&
                $target[0].nodeType === 1) {
                p = ($target.offset()).top;
            }
            $('html,body').animate({ scrollTop: p }, 'fast');
        },

        /**
         * 画面トップへスクロールする。
         */
        'self::scrollTop' : function() {
            //ページ上部へスクロール
            return this.scrollTo();
        },

    });

    /**
     * @class Navigatorを有効化するクラス
     *
     * @example
     *
     * ------------------------------------------------
     * Javascript
     *
     * // '.navigator'クラスをNavigator化する(default)
     * $(document).navigator();
     *
     * // '.navigatorA'クラスをNavigator化する
     * $(document).navigator('#custom-navigator-id');
     *
     * ------------------------------------------------
     * HTML
     *
     * // Navigatorを生成するDOM構成(#cmn-navigator-idの要素をNavigator化)
     * <div class='navigator' id='cmn-navigator-id'>
     *     <div class='arrow-base'>
     *         <div class='arrow enabled'>
     *             <span>事前確認</span>
     *         </div>
     *     </div>
     * </div>
     *
     */
    $.fn.navigator = $.jQueryClass.create({

        /**
         * 初期化処理
         * @constructor
         */
        initialize: function(selector){

            // 指定しない場合は、デフォルトのID'#cmn-navigator-id'を指定
            if (selector === undefined) {
                selector = '#cmn-navigator-id';
            }
            this.selector = selector;

            // ステータス種別 enum
            this.STATCLS = {
                CURRENT: 'current',
                ENABLED: 'enabled',
                DISABLED: 'disabled',
                UNKNOWN: ''
            };

            // イベントのアタッチ処理
            this._attachedEvent();

            return this;

        },

        /**
         * Navigatorの現在の矢印Button(タグ)を「現在閲覧中」に切り替える
         * 
         * @param {jQuery} $tag 切替対象の矢印Button(タグ)
         * 
         * @return {jQuery} 自身のDOM Element
         */
        setCurrent: function($tag) {
            return this._changeStatus($tag, this.STATCLS.CURRENT);
        },

        /**
         * Navigatorの現在の矢印Button(タグ)を「Active状態」に切り替える
         * 
         * @param {jQuery} $tag 切替対象の矢印Button(タグ)
         * 
         * @return {jQuery} 自身のDOM Element
         */
        setEnabled: function($tag) {
            return this._changeStatus($tag, this.STATCLS.ENABLED);
        },

        /**
         * Navigatorの現在の矢印Button(タグ)を「Inactive状態」に切り替える
         * 
         * @param {jQuery} $tag 切替対象の矢印Button(タグ)
         * 
         * @return {jQuery} 自身のDOM Element
         */
        setDisabled: function($tag) {
            return this._changeStatus($tag, this.STATCLS.DISABLED);
        },

        /**
         * タグの状態が「現在閲覧中」か確認する
         * 
         * @param {jQuery} $tag 切替対象の矢印Button(タグ)
         * 
         * @return {boolean} true: True、false: False
         */
        isCurrent: function($tag) {
            return this._hasStat($tag, this.STATCLS.CURRENT);
        },

        /**
         * タグの状態が「Active状態」か確認する
         * 
         * @param {jQuery} $tag 切替対象の矢印Button(タグ)
         * 
         * @return {boolean} true: True、false: False
         */
        isEnabled: function($tag) {
            return this._hasStat($tag, this.STATCLS.ENABLED);
        },

        /**
         * タグの状態が「Inactive状態」か確認する
         * 
         * @param {jQuery} $tag 切替対象の矢印Button(タグ)
         * 
         * @return {boolean} true: True、false: False
         */
        isDisabled: function($tag) {
            return this._hasStat($tag, this.STATCLS.DISABLED);
        },

        /**
         * Navigatorの現在の矢印Button(タグ)を取得する
         * 
         * @return {jQuery} 現在の矢印Button（タグ）DOM Element
         */
        getCurrent: function() {
            return $(this.selector).find('.' + this.STATCLS.CURRENT).parent();
        },

        /**
         * Navigatorの矢印Button(タグ)が切り替わったことを通知する
         * 
         * @param {function} fn 通知先関数
         *
         * ------------------------------------------------
         * 通知先function
         * @param {Event} e 通知先関数
         * @param {jQuery} $current 切替後の「現在閲覧中」の矢印Button(タグ)
         * 
         */
        onCurrentChanged: function(fn) {
            $(document).on('currentchanged', this.selector, function(e){
                fn(e, e.current);
            });
        },

        /**
         * Navigatorの現在の矢印Button(タグ)のStringを設定する。
         * 
         * @param {jQuery または number} $tag 切替対象の矢印Button(タグ)要素もしくはインデックス
         * @param {String または Array.<String>} txt 変更後のString。 <br>
         *        7文字以上になる場合はArrayに指定する。<br>
         *        最大文字数は、6文字以下を2行までとなる。
         * 
         * @return {jQuery} 書き換え後のDOM Element
         */
        setText: function($tag, txt) {

            var $fixedTag = this._getFixedTag($tag);

            if ($fixedTag !== undefined) {

                // <span>の内容を書き換える
                var label = $fixedTag.find(':first-child');

                // Arrayの場合は2行
                if ($.isArray(txt)) {
                    $(label).html(txt.join('<br />'));
                    $fixedTag.addClass('multi-line');
                // String指定
                } else {
                    $(label).html(txt);
                    $fixedTag.removeClass('multi-line');
                }
            }
            
            return $tag;

        },

        /**
         * 矢印Button(タグ)クリック、マウスオーバーイベントをアタッチする
         * @private
         */
        _attachedEvent: function() {
           
            var self = this;

            $(document).on('click', this.selector + ' .arrow', function(e){
                // クリックされたら、現在閲覧中に書き換え、通知する
                self._changeCurrent($(this), self);
            });

        },

        /**
         * 矢印Button(タグ)の状態を切り替える
         * @private
         * 
         * @param {jQuery または number} $tag 切替対象の矢印Button(タグ)要素もしくはインデックス
         * @param {String} stat 状態クラス('enabled current disabled')
         * 
         * @return {jQuery} 自身のDOM Element
         */
        _changeStatus: function($tag, stat) {

            var $fixedTag = this._getFixedTag($tag);

            if ($fixedTag !== undefined) {

                // 「現在閲覧中」の要素を変更する場合は、古い「現在閲覧中」の要素を「Active状態」に書き換える
                if (stat == this.STATCLS.CURRENT) {
                    this._changeCurrent($fixedTag, this);

                // それ以外の場合は、要素を指定された状態に書き換える
                } else {
                    // 全状態をリセットし、新しい状態をセットする
                    this._resetStat($fixedTag);
                    $fixedTag.addClass(stat);
                }

            }
            
            return this;
        },

        /**
         * インデックス要素とDOM Elementを判定し、DOM Elementにしたものを返却する。
         * @private
         */
        _getFixedTag: function($tag) {

            var $ret;

            // 数字指定の場合はインデックス処理
            if (typeof $tag === 'number') {
                var index = $tag;
                var arrows = $(this.selector).find('.arrow-base');
                if (arrows.length > index) {
                    // Active状態のDOM Element
                    $tag = $(arrows[index]);
                }
            }

            // DOM Elementであれば処理する
            if ($tag !== undefined &&
                $tag.length > 0 &&
                $tag[0].nodeType === 1) {

                $ret = $tag.find('.arrow');
            }
            
            return $ret;
        },

        /**
         * 矢印Button(タグ)を切り替える
         * @private
         */
       _changeCurrent: function($next, self) {

            // 要素がActive状態の場合のみタグ切替可能
            if ($next.hasClass(self.STATCLS.ENABLED)) {

                // 現在のタグを「Active状態」に設定
                var $old = $(this.selector).find('.' + self.STATCLS.CURRENT);
                self._resetStat($old);
                $old.addClass(self.STATCLS.ENABLED);

                // 新しいタグを「現在閲覧中」に設定
                self._resetStat($next);
                $next.addClass(self.STATCLS.CURRENT);

                // タグ切替イベントを発火
                var event = new $.Event('currentchanged', {current: $next.parent()});
                $(self.selector).trigger(event);
            }
        },

        /**
         * Allの状態を Clearする
         * @private
         */
        _resetStat: function($tag) {
            // 全状態をリセットし、新しい状態をセットする
            $tag.removeClass(
                this.STATCLS.CURRENT + ' ' + 
                this.STATCLS.ENABLED + ' ' + 
                this.STATCLS.DISABLED);
        },

        /**
         * Navigatorの現在の矢印Button(タグ)を取得する
         * @private
         * 
         * @param {jQuery} $tag 切替対象の矢印Button(タグ)
         * @param {String} stat 照会する状態
         * 
         * @return {jQuery} 現在の矢印Button（タグ）DOM Element
         */
        _hasStat: function($tag, stat) {

            var $fixedTag = this._getFixedTag($tag);

            if ($fixedTag !== undefined) {
                return $fixedTag.hasClass(stat);
            }

            return false;
        }

    });

    /**
     * @class Tracking Panelを有効化するクラス
     *
     * @example
     *
     * ------------------------------------------------
     * Javascript
     *
     * // '.tracking-panel'クラスをTracking Panel化する(default)
     * $(document).trackingPanel();
     *
     * // '.tracking-panelA'クラスをTracking Panel化する
     * $(document).trackingPanel('#tracking-panel-id');
     *
     * ------------------------------------------------
     * HTML
     *
     * // Tracking Panelを生成するDOM構成(.tracking-panelクラスをTracking Panel化)
     * <div class='tracking-panel' id='tracking-panel-id'>
     *     <dl>
     *         <dt>Tracking Panel Title</dt>
     *         <dd>パネルコンテンツ：XX</dd>
     *     </dl>
     * </div>
     *
     */
    $.fn.trackingPanel = $.jQueryClass.create({

        /**
         * 初期化処理
         * @param {string} selector - Tracking Panel化するDOMのセレクターを指定
         * @constructor
         */
        initialize: function(selector){

            // 指定しない場合は、デフォルトのクラス'.tracking-panel'を指定
            if (selector === undefined) {
                selector = '.tracking-panel';
            }
            // 指定要素を画面に追加（追従）
            $(selector).addClass('stack');

            return this;
        }

    });


    /**
     * @class Tooltipを有効化するクラス
     *
     * @example
     *
     * ------------------------------------------------
     * Javascript
     *
     * // '.tooltip'クラスをTooltip化する(default)
     * $(document).tooltip();
     *
     * // '.tooltipA'クラスをTooltip化する
     * $(document).tooltip({selector: '.tooltipA'});
     *
     * ------------------------------------------------
     * HTML
     *
     * // Tooltipを生成するDOM構成(.tool-topクラスをTooltip化)
     * <div class='tooltip'>
     *     <p>Tooltipで説明が必要な文字</p> <!-- Tooltipで説明が必要な文字 -->
     *     <input type='button' id='btn-apply' class='btn-img' /> <!-- Tooltipを表示するトリガーになる要素 -->
     *     <dl>
     *         <dt>Tooltip Title</dt>  <!-- Tooltip Title -->
     *         <dd>This is the content of the Tooltip.</dd>  <!-- Tooltipコンテンツ -->
     *     </dl>
     * </div>
     *
     */
    $.fn.tooltip = $.jQueryClass.create({

        /**
         * 初期化処理
         * @param {string} event - クリック、またはマウスオーバーのイベント種別を指定する<br>
         *  クリック：’click’、マウスオーバー：’hover’
         * @param {string} selector - Tooltipを適用するセレクタ名<br>
         *  例）ID：’#id’、クラス：’.class’<br>
         *  指定しない場合は、デフォルトのクラス'.tooltip'が指定されているAllの要素に適用される
         * @constructor
         */
        initialize: function(event, selector){

            // click,hover以外は何もしない
            if ((event != 'click') && 
                (event != 'hover')) {
                return this;
            }
            this.event = event;

            // 指定しない場合は、デフォルトのクラス'.tooltip'が指定されているAllの要素に適用
            if (selector === undefined) { 
                selector = '.tooltip';
            }

            // tooltip-triggerクラスの要素をTooltipを表示するトリガーとしてイベントを付ける
            this.triggerSelector = selector +' .tooltip-trigger';
            this.closeBtnSelector = '.tooltip-close';
            this._attachedEvent();

            return this;
        },

        /**
         * イベントのトリガーとなるセレクターにイベントを付加する
         * @private
         */
        _attachedEvent: function() {

            var self = this;

            if(self.event == 'click') {

                // 後から追加されたDOMにもイベントを付加できるように、
                // Documentに対してイベントをつける
                $(document).on('click', this.triggerSelector, function() {
                    // トリガーとなるDOMの次の要素をTooltip部とする
                    var $tooltip = $(this).next();

                    self._initLayoutIfFirst($(this), $tooltip);
                    // Tooltipを適切な位置に配置
                    self._setViewPosition($(this), $tooltip);

                    // Tooltipの表示・非表示を切り替え
                    $tooltip.cmn().isShow() ? $tooltip.cmn().hide() : $tooltip.cmn().show();
                });

            } else if(self.event == 'hover') {

                // 後から追加されたDOMにもイベントを付加できるように、
                // Documentに対してイベントをつける
                $(document).on({

                    mouseenter: function() {
                         // トリガーとなるDOMの次の要素をTooltip部とする
                        var $tooltip = $(this).next();

                        self._setViewPosition($(this), $tooltip);

                        // Tooltipの表示・非表示を切り替え
                        $tooltip.cmn().show();
                    },

                    mouseleave: function() {
                        // トリガーとなるDOMの次の要素をTooltip部とする
                        var $tooltip = $(this).next();

                        self._setViewPosition($(this), $tooltip);

                        // Tooltipの表示・非表示を切り替え
                        $tooltip.cmn().hide();
                    }
                }, this.triggerSelector);
            }
        },

        /**
         *
         */
        _initLayoutIfFirst: function($trigger, $tooltip) {
            // domに対して、attachedが設定されてないか、
            // falseの場合は、CloseButtonを追加する
            // ※ タッチイベントの度に追加されることを防止
            !$trigger.data('attached') && this._addCloseBtn($tooltip);
            // ※ タッチイベントの度に追加されることを防止
            $trigger.data('attached', 'true');
        },

        /**
         * Tooltipを適切な位置に配置
         * @param {jQuery} $trigger - トリガーとなるDOM Element
         * @param {jQuery} $tooltip - Tooltip部となるDOM Element
         * @private
         */
        _setViewPosition: function($trigger, $tooltip) {

            var intScrScroll = $(window).scrollTop(); // 最初の要素の現在のスクロール上の上位置を取得する
            var intScrBottom = intScrScroll + $(window).height(); // 現在のスクロール上の上位置とウィンドウの高さを取得する
            var intBoxOffset = $trigger.offset().top; // offset : 最初の要素のドキュメント上での表示位置を返す
            var intBoxAdjust = $trigger.offset().left + $tooltip.width() - $(window).width();
            var intRefHeight = $tooltip.outerHeight(); // outerHeight : 最初の要素の外部高さ(border, padding含む)を取得する
            var intTipHeight = $tooltip.outerHeight();

            // Math.abs : 絶対値を計算してその結果を返す
            if (intScrBottom < intBoxOffset + intRefHeight + intTipHeight && 
                Math.abs(intScrScroll - intBoxOffset) > intTipHeight) {
                $tooltip.css('top', '-' + intTipHeight + 'px');
            } else {
                $tooltip.css('top', 'auto');
            }

            // adjust left
            if(intBoxAdjust > 0) {
                $tooltip.css('left', ($trigger.position().left) - intBoxAdjust + 'px');
            } else {
                $tooltip.css('left', ($trigger.position().left) + 'px');
            }

        },

        /**
         * CloseButtonを追加する
         * @param {jQuery} $tooltip - Tooltip部分
         * @private
         */
        _addCloseBtn: function($tooltip) {

            // 右上の「×」Button
            var rightCloseBtn = $('<div class=\'btn-img-close-s tooltip-close\'></div>');
            // CloseButtonが必要な場合はコメントアウトをはずす
            // var bottomCloseBtn = $('<div class=\'btn-img-close-l tooltip-close\'></div>');

            $tooltip.find('dt').append(rightCloseBtn);
            // $tooltip.find('dd').append(bottomCloseBtn);

            $(this.closeBtnSelector, $tooltip).on('click', function(e) {
                e.preventDefault();
                $tooltip.cmn().hide();
            });
        }

    });


});

