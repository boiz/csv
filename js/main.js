Array.prototype.insertColumnAfter=function(col,newCol){
	const start=+new Date;
	const index=this[0].indexOf(col);

	this.forEach((item,i)=>{
		if(i==0) item.splice(index+1,0,newCol);
		else item.splice(index+1,0,"");
	});

}

const format=res=>{
	return res.split("\n").map(x=>x.split(","));
}

const storeIDs=[2,3,6,9,10,11,12,14,17,18,19,20,21,22,24];
const reg=/PAL|NC|NV|SC/;

const storeMapping=arr=>{
	return storeIDs.map(x=>{
		arr[0]=x.toString();
		return arr.slice();
	});
}


time.start("loading");

ajax({
	url:"files/price_tab.csv",
	method:"get",
	responseType:"text",
	callback:res=>{

		time.end("loading");

		time.start("format");
		arr=format(res);
		time.end("format");


		time.start("insert");
		arr.insertColumnAfter("SubDept","Category");

		time.end("insert");

		let newArr=[];
		let apdArr=[];


		time.start("duplicate");

		let c=0;

		arr.forEach((x,i)=>{
			
			if(reg.test(x[0])){
				
				const aaa=storeMapping(x);
				//console.log(c++);
				
				apdArr=apdArr.concat(aaa);

			}
			else newArr.push(x);
		});


		newArr=newArr.concat(apdArr);

		//console.log(newArr.join("\n"));
		console.log(newArr);

		time.end("duplicate");

		//console.log(newArr.length+c,arr.length);


		//console.log(newArr);

	}
});



