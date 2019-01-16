class IDCARD {
    constructor(value) {
        var [$1, $2, $3, $4, $5] = this.placer(value);
        this.prov = global.gb2260.get($1);
        this.city = global.gb2260.get($2);
        this.area = global.gb2260.get($3);
        this.sex = ($5 % 2 === 1) ? "男" : "女";
        this.age = moment().diff($5, "years");
        this.birth = moment($5).locale('zh-tw').format('LL');
        return Promise.resolve(this)
    }
    placer(value) {
        return value.replace(/(\d{2})(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{3})(\w{1})/, [
            '$10000', '$1$200', '$1$2$3', '$7', '$4-$5-$6'
        ]).split(",").map((x) => {
            return (isNaN(x)) ? x : Number(x)
        })
    }
    sex($7) {
        return ($7 % 2 === 1) ? "男" : "女"
    }

    birth($5) {
        return moment($5).locale('zh-tw').format('LL')
    }

    get abc() {
        return 134
    }

    age($5) {
        return moment().diff($5, "years")
    }
    static sex($4) {
        return ($4 % 2 === 1) ? "男" : "女"
    }
    static age($5) {
        return moment().diff($5, "years")
    }
    static birth($5) {
        return moment($5).locale('zh-tw').format('LL')
    }
}




//service.idcard.