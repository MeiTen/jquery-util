
$(function(){

    /**
     * コンテンツ開閉Button、および開閉処理の実装
     */
    $(document).on('click', '#btn-accordion', function(){

        $('#btn-accordion').cmnButton().toggleVal('(+) Open', '(-) Close');
        // $('#div-accordion').accordion().toggle();

        $('#div-accordion').accordion().toggle()
            .done(function() {
                //console.log('done ');
            }).fail(function(e) {
                //console.log('fail ');
            });

    });

    /**
     * Checkbox 選択変更イベント
     */
    $(document).on('change', ':checkbox', function(){
        // Checkbox
        var retArray = $('[id^=chk-set]').cmnCheck().getCheckedNodeList();
        //console.log('checkbox cls(checked) : ');
        $.each(retArray, function() {
            // console.log($(this).attr('id') + ', ');
        });

    });

    /**
     *  Radio  Button 選択変更イベント
     */
    $(document).on('change', ':radio', function(){
        //  Radio  Button
        var $ret = $('[id=rdo-set-flat01]').cmnRadio().getCheckedNode();
        // if ($ret != null) console.log('radio button cls(checked) : ' + $ret.attr('id'));
        $ret = $('[id=rdo-set-solid01]').cmnRadio().getCheckedNode();
        // if ($ret != null) console.log('radio button cls(checked) : ' + $ret.attr('id'));
        $ret = $('[id=rdo-set-flat02]').cmnRadio().getCheckedNode();
        // if ($ret != null) console.log('radio button cls(checked) : ' + $ret.attr('id'));
        $ret = $('[id=rdo-set-solid02]').cmnRadio().getCheckedNode();
        // if ($ret != null) console.log('radio button cls(checked) : ' + $ret.attr('id'));
        $ret = $('[id=rdo-set-normal]').cmnRadio().getCheckedNode();
        // if ($ret != null) console.log('radio button cls(checked) : ' + $ret.attr('id'));

    });

    /**
     * 画面上部へ移動
     */
    $(document).on('click', '#btn-scroll-top', function(){
        $.CmnUtil.scrollTop();
    });

    /**
     * 画面上部へ移動
     */
    $(document).on('click', '#btn-scroll-spc', function(){
        $.CmnUtil.scrollTo($('#scroll-to-spc'));
    });

    /**
     * Drop Down List 選択変更イベント
     */
    $(document).on('change', '#select-flat01', function(){
        // 選択されているvalue属性値を取り出す
        var retArray = $('#select-flat01').cmnSelect().getSelectedOptionList();
        //console.log('drop down list : ');
        $.each(retArray, function() {
            //console.log($(this).attr('id') + ', ');
        });
    });

    /**
     * Drop Down List 追加処理
     */
    $(document).on('change', '#select-add', function(){

        var selected = $('#select-add').cmnSelect().getSelectedOption().attr('id');

        if (selected == 'opt-add-01') {

            $('#select-flat01').cmnSelect().addOption('val-first', '先頭', 0);

        } else if (selected == 'opt-add-02') {

            $('#select-flat01').cmnSelect().addOption('val-end', '最後', 1);

        } else if (selected == 'opt-add-03') {

            $('#select-flat01').cmnSelect().addOption('val-mid', 'Spec Pos ', $('#select-opt-02'));

        } else if (selected == 'opt-add-04') {

            var optListFirst = [
            '<option id="select-opt-05" value="opt-05" >先頭Array01</option>',
            '<option id="select-opt-06" value="opt-06" >先頭Array02</option>'];
            $('#select-flat01').cmnSelect().addOptionList(optListFirst, 0);

        } else if (selected == 'opt-add-05') {

            var optListEnd = [
                '<option id="select-opt-07" value="opt-07" >最後Array01</option>',
                '<option id="select-opt-08" value="opt-08" >最後Array02</option>'];
            $('#select-flat01').cmnSelect().addOptionList(optListEnd, 1);

        } else if (selected == 'opt-add-06') {

            var optListMid = [
                '<option id="select-opt-09" value="opt-09" >Spec Pos Array01</option>',
                '<option id="select-opt-10" value="opt-10" >Spec Pos Array02</option>'];
            $('#select-flat01').cmnSelect().addOptionList(optListMid, $('#select-opt-02'));

        } 

    });

    /**
     * Drop Down List 削除処理
     */
    $(document).on('change', '#select-remove', function(){

        var selected = $('#select-remove').cmnSelect().getSelectedOption().attr('id');

        if (selected == 'opt-remove-01') {

            $('#select-flat01').cmnSelect().removeOption('opt-01');

        } else if (selected == 'opt-remove-02') {

            $('#select-flat01').cmnSelect().removeOption($('#select-opt-03'));

        }

    });

    /**
     * Drop Down List 削除処理
     */
    $(document).on('click', '#select-reset', function(){
        $('#select-flat01').cmnSelect().reset();
        $('#select-solid01-multi').cmnSelect().reset();
    });

    /**
     * Invert bg color 選択変更イベント
     */
    $(document).on('change', '#select-val-err', function(){
        var retArray = $('#select-val-err').cmnSelect().getSelectedOptionList();
        var selected = $(retArray[0]).attr('id');
        
        var targets = [
            $('#tbl-period-start'),
            $('#tbl-period'),
            $('#tbl-period-first')];
        
        if (selected == 'opt-set-err-one') {
            $('#tbl-period-start').cmn().setValErr(true);
        } else if (selected == 'opt-set-f-err-one') {
            $('#tbl-period-start').cmn().setValErr(false);
        } else if (selected == 'opt-set-err-mult') {
            $.CmnUtil.setValErr(targets, true);
        } else if (selected == 'opt-set-f-err-mult') {
            $.CmnUtil.setValErr(targets, false);
        } else if (selected == 'opt-clear-err-one') {
            $('#tbl-period-start').cmn().clearValErr();
        } else if (selected == 'opt-clear-err-mult') {
            $.CmnUtil.clearValErr(targets);
        } else if (selected == 'opt-clear-err-all') {
            $.CmnUtil.clearValErrAll();
        }
        //  else if (selected == 'opt-tgl-err-one') {
        //     $('#tbl-period-start').cmn().toggleValErr();
        // } else if (selected == 'opt-tgl-err-mult') {
        //     $.CmnUtil.toggleValErr(targets);
        // }

    });

    /**
     * ActiveInactive 選択変更イベント
     */
    $(document).on('change', '#select-dsbl', function(){
        var retArray = $('#select-dsbl').cmnSelect().getSelectedOptionList();
        var selected = $(retArray[0]).attr('id');
        
        var targets = [
            $('#tbl-period-start'),
            $('#tbl-period'),
            $('#tbl-period-first')];

        if (selected == 'opt-set-dsbl-one') {
            $('#tbl-period-start').cmn().setDisabled(true);
        } else if (selected == 'opt-set-f-dsbl-one') {
            $('#tbl-period-start').cmn().setDisabled(false);
        } else if (selected == 'opt-set-dsbl-mult') {
            $.CmnUtil.setDisabled(targets, true);
        } else if (selected == 'opt-set-f-dsbl-mult') {
            $.CmnUtil.setDisabled(targets, false);
        }else if (selected == 'opt-clear-dsbl-one') {
            $('#txt-normal-dsbl').cmn().clearDisabled();
        } else if (selected == 'opt-clear-dsbl-mult') {
            $.CmnUtil.clearDisabled(targets);
        } else if (selected == 'opt-clear-dsbl-all') {
            $.CmnUtil.clearDisabledAll();
        } else if (selected == 'opt-set-dsbl-parent') {
            $('#change-view-sample').cmn().setDisabled(true);
        } else if (selected == 'opt-set-f-dsbl-parent') {
            $('#change-view-sample').cmn().setDisabled(false);
        }
        //  else if (selected == 'opt-tgl-dsbl-one') {
        //     $('#tbl-period-start').cmn().toggleDisabled();
        // } else if (selected == 'opt-tgl-dsbl-mult') {
        //     $.CmnUtil.toggleDisabled(targets);
        // } 

    });

    /**
     * Navigatorを表示・非表示する処理
     */
    var navigator = $(document).navigator();
    var $currentTag = navigator.getCurrent();

    var navigatorJ = $(document).navigator('#cmn-navigator-id-j');

    navigator.onCurrentChanged(function(e, $current) {
        // console.log('onCurrentChanged ' + $current.find('span').text());
        var $next = $current.next();
        if (navigator.isDisabled($next)) {
            navigator.setEnabled($next);
        }

        $currentTag = $current;

    });    

    /**
     * Navigatorーイベント
     */
    $(document).on('change', '#select-navigator-num', function(){
        var retArray = $('#select-navigator-num').cmnSelect().getSelectedOptionList();
        var selected = $(retArray[0]).attr('id');
        
        if (selected == 'opt-01') {
            navigator.setCurrent(0);
        } else if (selected == 'opt-02') {
            navigator.setCurrent(1);
        } else if (selected == 'opt-03') {
            navigator.setCurrent(2);
        } else if (selected == 'opt-04') {
            navigator.setCurrent(3);
        } else if (selected == 'opt-05') {
            navigator.setCurrent(4);
        } else if (selected == 'opt-06') {
            navigator.setCurrent(5);
        } else if (selected == 'opt-07') {
            navigator.setCurrent(6);
        } else if (selected == 'opt-08') {
            navigator.setCurrent(7);
        } else if (selected == 'opt-09') {
            navigator.setCurrent(8);
        }

    });

    $(document).on('change', '#select-navigator-tag', function(){
        var retArray = $('#select-navigator-tag').cmnSelect().getSelectedOptionList();
        var selected = $(retArray[0]).attr('id');
        
        if (selected == 'opt-01') {
            navigator.setCurrent($('#cmn-navigator-id').find('#arrow-01'));
        } else if (selected == 'opt-02') {
            navigator.setCurrent($('#cmn-navigator-id').find('#arrow-02'));
        } else if (selected == 'opt-03') {
            navigator.setCurrent($('#cmn-navigator-id').find('#arrow-03'));
        } else if (selected == 'opt-04') {
            navigator.setCurrent($('#cmn-navigator-id').find('#arrow-04'));
        } else if (selected == 'opt-05') {
            navigator.setCurrent($('#cmn-navigator-id').find('#arrow-05'));
        } else if (selected == 'opt-06') {
            navigator.setCurrent($('#cmn-navigator-id').find('#arrow-06'));
        } else if (selected == 'opt-07') {
            navigator.setCurrent($('#cmn-navigator-id').find('#arrow-07'));
        } else if (selected == 'opt-08') {
            navigator.setCurrent($('#cmn-navigator-id').find('#arrow-08'));
        } else if (selected == 'opt-09') {
            navigator.setCurrent($('#cmn-navigator-id').find('#arrow-09'));
        }

    });

    $(document).on('change', '#select-navigator-val-num', function(){
        var retArray = $(this).cmnSelect().getSelectedOptionList();
        var selected = $(retArray[0]).attr('id');

        if (selected == 'opt-01') {
           navigator.setText(1, "変更Text");
        } else if (selected == 'opt-02') {
           navigator.setText(1, ["変更", "Text"]);
        }
    });

    $(document).on('change', '#select-navigator-val-tag', function(){
        var retArray = $(this).cmnSelect().getSelectedOptionList();
        var selected = $(retArray[0]).attr('id');
        
        if (selected == 'opt-01') {
           navigator.setText(navigator.getCurrent(), "変更Text");
        } else if (selected == 'opt-02') {
           navigator.setText(navigator.getCurrent(), ["変更", "Text"]);
        }
    });

    /**
     * Tooltipを表示・非表示する処理
     */
    // selectorを指定しない場合は、tooltipクラスを持つすべての要素が適用される
    // $(document).tooltip('hover');
    $(document).tooltip('hover', '#tool-hover-id');
    $(document).tooltip('click', '#tool-click-id');

    /** Tracking Panel */
    // selectorを指定しない場合は、tracking-panelクラスを持つすべての要素が適用される
    // $(document).trackingPanel();
    // $(document).trackingPanel('#tracking-panel-id-01');
    $(document).trackingPanel('#tracking-panel-id-02');

    $(document).on('click', '#btn-trk-panel', function(){
        // var $panel1 = $('#tracking-panel-id-01');
        // $panel1.cmn().isShow() ? $panel1.cmn().hide() : $panel1.cmn().show();

        var $panel2 = $('#tracking-panel-id-02');
        $panel2.cmn().isShow() ? $panel2.cmn().hide() : $panel2.cmn().show();
    });

    /**
     * $.Classを使った実装Sample
     */
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

    /* クラスの生成 */
    var personA = new Person('taro', 23);
    var personB = new Person('hanako', 12);

    /* クラスの継承 */
    var superA = new SuperMan('taro', 23, 999);
    var superB = new SuperMan('hanako', 12, 10);

    // console.log('Name:' + personB.getName() + ', Age:' + personB.getAge());
    // console.log('Name:' + superB.getName() + ', Age:' + superB.getAge() + ', Power:' + superB.power);

    // console.log('Name:' + personA.getName() + ', Age:' + personA.getAge());
    // console.log('Name:' + superA.getName() + ', Age:' + superA.getAge() + ', Power:' + superA.power);

    // console.log(Person.getDummyName());
    // console.log(SuperMan.getDummyName());


});
