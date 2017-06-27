 /*
 * Bucket sort algorithm ! (or bin sort)
 * Class	Sorting algorithm
 * Data structure	Array
 * Worst-case performance	O(n^{2}) 
 * Best-case performance	\Omega (n+k) 
 * Average performance	\Theta (n+k) 
 * Worst-case space complexity O(n\cdot k)
 *   where n is the size of the input array.
 *   Note: Bucket sort can be seen as a generalization of counting sort; in fact, if each bucket has size 1 then 
 *         bucket sort degenerates to counting sort. The variable bucket size of bucket sort allows it to use O(n) 
 *         memory instead of O(M) memory, where M is the number of distinct values; in exchange, it gives up 
 *         counting sort's O(n + M) worst-case behavior.
 *
 * Author: Pooya Hatami
 */
 
 exports.bucketSort = function(inputArray,ibucket) {
  if(!inputArray) return -1;
  if(inputArray.length === undefined) return -1;

  var arrlen = inputArray.length;
  var code = maxsqrt(inputArray,arrlen);
  if (code[0]<=0) return bsunderone(inputArray,ibucket,arrlen);
  else return bs(inputArray,ibucket,arrlen);
}


// Function to sort input[] of size n using bucket sort
bs = function(input,ibucket,arrlen)
{
    // 1) Create n empty buckets
    //vector<float> b[n];
    var code = maxsqrt(input,arrlen);
    ibucket = code[1];
    console.log(input,ibucket,arrlen,code);
    var b = new Array(ibucket);
    for (i=0; i<ibucket; i++)
         b[i]= new Array();
    // for(var oneb in b)
    //     oneb = new Array(2);
    //var b = new Object();
    console.log(b);
    // 2) Put array elements in different buckets
    for (i=0; i<arrlen; i++)
    {
       //var bi = Math.floor(ibucket*input[i]); // Index in bucket
       var bi = indexmaker(input[i],code);
       //b[bi].push(input[i]);
       console.log("index="+bi);
       b[bi].push(input[i]);
    }
    
    console.log(b);
    // 3) Sort individual buckets
    for (i=0; i<ibucket; i++) {
//    for (var i in b)
         //sort(b[i].begin(), b[i].end());
         console.log("befor sort : "+b[i]);
         b[i].sort(sortNumber);
         console.log("after sort : "+b[i]);
    }
    console.log(b);
 
 
    // 4) Concatenate all buckets into input[]
    var index = 0;
    for (i = 0; i < ibucket; i++)
//    for (var i in b)
        for (j = 0; j < b[i].length; j++)
//        for (var j in b[i])
          input[index++] = b[i][j];
//          console.log(i,j,b[i][j]);

  return input;
  
}


maxsqrt = function(input,arrlen)
{
  var output = new Array(2);
  var m = input[0];
  for (i = 1; i < input.length; i++) {
    if (m < input[i]) {
      m = input[i];
    }
  }
  output[0] = Math.floor(m);
  output[1] = Math.floor(Math.sqrt(input.length));
  return output;
}
 
indexmaker = function(oneinputcell,code)
{
  var output = Math.floor(oneinputcell / code[0] * (code[1] - 1))
  return output;
}

sortNumber = function(a,b)
{
    return a - b;
}


// Function to sort input[] of size n using bucket sort
bsunderone = function(input,ibucket,arrlen)
{
   console.log(input,ibucket,arrlen);
    // 1) Create n empty buckets
    //vector<float> b[n];
    var b = new Array(ibucket);
    for (i=0; i<ibucket; i++)
         b[i]= new Array();
    // for(var oneb in b)
    //     oneb = new Array(2);
    //var b = new Object();
    console.log(b);
    // 2) Put array elements in different buckets
    for (i=0; i<arrlen; i++)
    {
       var bi = Math.floor(ibucket*input[i]); // Index in bucket
       //b[bi].push(input[i]);
       console.log(bi);
       b[bi].push(input[i]);
    }
    
    console.log(b);
    // 3) Sort individual buckets
    for (i=0; i<ibucket; i++) {
//    for (var i in b)
         //sort(b[i].begin(), b[i].end());
         console.log(b[i]);
         b[i].sort();
    }
    console.log(b);
 
 
    // 4) Concatenate all buckets into input[]
    var index = 0;
    for (i = 0; i < ibucket; i++)
//    for (var i in b)
        for (j = 0; j < b[i].length; j++)
//        for (var j in b[i])
          input[index++] = b[i][j];
//          console.log(i,j,b[i][j]);

  return input;
  
}




/*



    // A function to do counting sort of arr[] according to
    // the digit represented by exp.
    bs = function(input,n) {
      //get hash codes
      var code = hash(input);
      console.log(code[1]);
      //create and initialize buckets to ArrayList: O(n)
      var buckets = new Array(code[1]);
          for (var i = 0; i < code[1]; i++) {
            buckets[i] = new Array();
            }
    //distribute data into buckets: O(n)
    for(var k = 0; k < input.length; k++) //  (int i : input) 
          {
              var i = input[k];
              buckets[hash2(i, code)].add(i);
          }
      // * Sort each bucket: O(n).
      // * I mentioned above that the worst case for bucket sort is counting
      // * sort. That's because in the worst case, bucket sort may end up
      // * with one bucket per key. In such case, sorting each bucket would
      // * take 1^2 = O(1). Even after allowing for some probabilistic
      // * variance, to sort each bucket would still take 2-1/n, which is
      // * still a constant. Hence, sorting all the buckets takes O(n).
        for(var k = 0; k < buckets.length; k++) //   for (List bucket : buckets)
          {
              var bucket = buckets[k];
              Collections.sort(bucket);
          }
        var ndx = 0;
  ``    //merge the buckets: O(n)
        for (var b = 0; b < buckets.length; b++) {
          var bucketsb = buckets[b] 
          for(var k = 0; k < bucketsb.length; k++) //   for (int v : buckets[b])
          {
              var v = bucketsb[k];
              input[ndx++] = v;
          }
        }
}
 
 
    hash = function(input) {
      var m = input[0];
      for (var i = 1; i < input.length; i++) {
        if (m < input[i]) {
          m = input[i];
        }
      }
      var output = new Array(2);
      output[0] = m;
//      output[1] = Math.floor(Math.sqrt(input.length));
      output[1] = Math.floor(input.length);
      return output;
    }
     
    hash2 = function(input, code) {
      var output = Math.floor( input / code[0] * (code[1] - 1));
      return output;
    }


*/
/*

      var arrMax = getMax(arr,n);
     
      //console.log(arr,n,arrMax);
     	//Set up abacus
      var grid = new Array(n); 
          for (var i = 0; i < n; i++) {
              grid[i] = new Array(arrMax);
            }

      var levelcount = new Array(arrMax);
        		for(var i=0;i<arrMax;i++)
        		{
        			levelcount[i]=0;
        			for(var j=0;j<n;j++){
                //console.log(j,i);
        				grid[j][i]='_';
        			  
        			}
        		}
        		
      //display1D(arr);
      //display1D(levelcount);
      //display2D(grid);
      //Drop the beads
      		for(var i=0;i<n;i++)
      		{
      			var num=arr[i];
      			for(var j=0;num>0;j++)
      			{
      				grid[levelcount[j]++][j]='*';
      				num--;
      			}
      		}
      // System.out.println();
      //display2D(grid);
    		//Count the beads
    		var sorted=new Array(n);
    		for(var i=0;i<arr.length;i++)
    		{
    			var putt=0;
    			for(var j=0;j<arrMax&&grid[n-1-i][j]=='*';j++)
    				putt++;
    			sorted[i]=putt;
    		}
 
		return sorted;      
      
    }      
      

    // A utility function to display one dimention arr[]
    display1D  = function(arr)
    	{
    	  var onelinestr = "";
    		for(var i=0;i<arr.length;i++)
    		    onelinestr += arr[i]+" ";
    		console.log(onelinestr);
    	}
    // A utility function to display one dimention arr[]
    display1Dln  = function(arr)
    	{
    	  var onelinestr = "";
    		for(var i=0;i<arr.length;i++)
    		    onelinestr += arr[i]+" ";
    		console.log(onelinestr);
  		  console.log(" ");
    	}
    // A utility function to display Two dimention arr[]
    display2D  = function(arr)
    	{
    	  var onelinestr = "";
    		for(var i=0;i<arr.length;i++)
    		    display1D(arr[i]);
  		  console.log(" ");
    	}

    // A utility function to get maximum value in arr[]
    getMax  = function(arr,n)
    {
        var mx = arr[0];
        for (i = 1; i < n; i++)
            if (arr[i] > mx)
                mx = arr[i];
        return mx;
    }


*/
