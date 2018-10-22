
    if (requestBody && requestBody.formData) {

        console.log(requestBody.formData);


        var str = "";
        Object.entries(requestBody.formData).map(([name, value]) => {
            //console.log(name, value);
            str += `${name}=${value[0]}`;
        })

        console.log(str);
    }
