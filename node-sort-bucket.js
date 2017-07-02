 /*
 * Bucket sort algorithm ! (or bin sort)
 * Class	Sorting algorithm
 * Data structure	Array
 * Worst-case performance	O(n^{2}) 
 * Best-case performance	\Omega (n+k) 
 * Average performance	\Theta (n+k) 
 * Worst-case space complexity O(n.k)
 *   where n is the size of the input array.
 *   Note: Bucket sort can be seen as a generalization of counting sort; in fact, if each bucket has size 1 then 
 *         bucket sort degenerates to counting sort. The variable bucket size of bucket sort allows it to use O(n) 
 *         memory instead of O(M) memory, where M is the number of distinct values; in exchange, it gives up 
 *         counting sort's O(n + M) worst-case behavior.
 *
 * Author: Pooya Hatami
 */
 
 module.exports = function(inputArray,callback) {
  try {
    var code = maxsqrt(inputArray);   // code[0] : max element Code[1] : bucket size square of lenght // code[2] array lenght // code[3] min element 
    if (displaymode=="Yes") console.log("max",code[0],"lenght square",code[1],"array lenght",code[2],"min",code[3]);
    if (!inputArray || inputArray.length === undefined) {
        throw new Error("Input array is not valid !");
    // } else if (code[3] < 0 ) {
    //     throw new Error("negative element not accepted ! ");
    } else 
       callback(null, {
            bucketSort: function () {
              if (code[3] < 0 ) throw new Error("Negative element are not accepted ! for Bucket Sort.");
              if (displaymode=="Yes") console.log("Sorting Array",inputArray,"with bucketSort");
        		  if (code[0]<=0) return bsfractions(inputArray,10,code[2]);
              else return bs(inputArray,code);
			},
            mergeSort: function () {
            if (displaymode=="Yes") console.log("Sorting Array",inputArray,"with mergeSort");
        		  return ms(inputArray,0,code[2]-1);
			},
            binSort:function () {
              if (displaymode=="Yes") console.log("Sorting Array",inputArray,"with bucketSort which is the same as binSort!");
        		  return bs(inputArray,code);
			}
    });
  }
  catch (error) {
        callback(error,null);
  }
}


// exports.bucketSort = function(inputArray) {
//   if(!inputArray) return -1;
//   if(inputArray.length === undefined) return -1;

//   var code = maxsqrt(inputArray);   // code[0] : max element Code[1] :bucket Size Code[2] : Array length
//   if (code[0]<=0) return bsfractions(inputArray,10,code[2]);
//   else return bs(inputArray,code);
// }

var displaymode = "Yess"; //"Yes";

// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
merge = function(arr,l,m,r)
{
    var i, j, k;
    var n1 = m - l + 1;
    var n2 =  r - m;
 
    /* create temp arrays */
    var L = new Array(n1);
    var R = new Array(n2);
 
    /* Copy data to temp arrays L[] and r[] */
    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1+ j];
 
    /* Merge the temp arrays back into arr[l..r]*/
    i = 0; // Initial index of first subarray
    j = 0; // Initial index of second subarray
    k = l; // Initial index of merged subarray
    while (i < n1 && j < n2)
    {
        if (L[i] <= R[j])
        {
            arr[k] = L[i];
            i++;
        }
        else
        {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
 
    /* Copy the remaining elements of L[], if there
       are any */
    while (i < n1)
    {
        arr[k] = L[i];
        i++;
        k++;
    }
 
    /* Copy the remaining elements of R[], if there
       are any */
    while (j < n2)
    {
        arr[k] = R[j];
        j++;
        k++;
    }

  return arr;
}
 
/* l is for left index and r is right index of the
   sub-array of arr to be sorted */
ms = function(arr,l,r)
{
    if (l < r)
    {
        // Same as (l+r)/2, but avoids overflow for
        // large l and h
        var m = Math.floor(l+(r-l)/2);
        if (displaymode == "Yes") console.log("mid of ",l,"and",r,"is",m);
        // Sort first and second halves
        ms(arr, l, m);
        ms(arr, m+1, r);
 
        merge(arr, l, m, r);
    }
    return arr;
}
 
/* UTILITY FUNCTIONS */
/* Function to print an array */
printArray = function(a,size)
{
    var i;
    for (i=0; i < size; i++)
        console.log(a[i]);
    console.log("\n");
}
 

// Function to sort input[] of size n using bucket sort
// for positive float numbers  
bs = function(input,code)
{
    // 1) Create n empty buckets
    //vector<float> b[n];
    var maxelement = code[0];
    var ibucket = code[1];
    var arrlen  = code[2];
    if (displaymode == "Yes") console.log(input,ibucket,arrlen,code);
    var b = new Array(ibucket);
    for (i=0; i<ibucket; i++)
         b[i]= new Array();
    if (displaymode == "Yes") console.log("empty buckets ",b);
    // 2) Put array elements in different buckets
    for (i=0; i<arrlen; i++)
    {
       var bi = indexmaker(input[i],code); // Index in bucket
       if (displaymode == "Yes") console.log(input[i]," in bucket "+bi);
       b[bi].push(input[i]);
    }
    
    if (displaymode == "Yes") console.log("full buckets befor sort :\n",b);
    // 3) Sort individual buckets
    for (i=0; i<ibucket; i++) {
         if (displaymode == "Yes") console.log("bucket "+ i +" befor sort : "+b[i]);
         //b[i].sort(sortNumber);
         b[i] = is(b[i]);   // sorting each bucket with insertionSort 
         if (displaymode == "Yes") console.log("after sort : "+b[i]);
    }
    if (displaymode == "Yes") console.log("\nfull buckets after sort :\n", b);

    // 4) Concatenate all buckets into input[]
    var index = 0;
    for (i = 0; i < ibucket; i++)
        for (j = 0; j < b[i].length; j++)
          input[index++] = b[i][j];

  return input;
  
}

// Function to : 
//   find bigest element
//   creat bucket size
//   find Array lenght           
maxsqrt = function(input)
{
  var output = new Array(2);
  var arrlen = input.length;
  var max = input[0];
  var min = input[0];
  for (i = 1; i < input.length; i++) {
    if (max < input[i]) {
      max = input[i];
    }
    if (min > input[i]) {
      min = input[i];
    }
  }
  output[0] = Math.floor(max);
  output[1] = Math.floor(Math.sqrt(input.length));
  output[2] = arrlen;
  output[3] = Math.floor(min);
  return output;
}

// Function to make bucket index 
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
// for float numbers between 0 to 1
bsfractions = function(input,ibucket,arrlen)
{
   if (displaymode == "Yes") console.log(input,ibucket,arrlen);
    // 1) Create n empty buckets
    //vector<float> b[n];
    var b = new Array(ibucket);
    for (i=0; i<ibucket; i++)
         b[i]= new Array();
    if (displaymode == "Yes") console.log("empty fractions buckets ",b);
    // 2) Put array elements in different buckets
    for (i=0; i<arrlen; i++)
    {
       var bi = Math.floor(ibucket*input[i]); // Index in bucket
       if (displaymode == "Yes") console.log(input[i]," in bucket "+bi);
       b[bi].push(input[i]);
    }
    
    if (displaymode == "Yes") console.log("full buckets befor sort :\n", b);
    // 3) Sort individual buckets
    for (i=0; i<ibucket; i++) {
         if (displaymode == "Yes") console.log("bucket "+ i +" befor sort : "+b[i]);
         b[i].sort();
         if (displaymode == "Yes") console.log("bucket "+ i +" after sort : "+b[i]);
    }
    if (displaymode == "Yes") console.log("\nfull buckets after sort :\n", b);
 
 
    // 4) Concatenate all buckets into input[]
    var index = 0;
    for (i = 0; i < ibucket; i++)
        for (j = 0; j < b[i].length; j++)
          input[index++] = b[i][j];

  return input;
  
}

// Function to sort input[] of size n using bucket sort 
// for numbers positive or negative
is = function(input) {

        var n = input.length;
        for (i=1; i<n; ++i)
        {
            var key = input[i];
            var j = i-1;
 
            // Move elements of input[0..i-1], that are
            //   greater than key, to one position ahead
            //   of their current position 
            while (j>=0 && input[j] > key)
            {
                input[j+1] = input[j];
                j = j-1;
            }
            input[j+1] = key;
        }

      return input;
   };
