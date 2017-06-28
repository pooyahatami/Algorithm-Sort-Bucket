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
 
 exports.bucketSort = function(inputArray) {
  if(!inputArray) return -1;
  if(inputArray.length === undefined) return -1;

  var code = maxsqrt(inputArray);   // code[0] : max element Code[1] :bucket Size Code[2] : Array length
  if (code[0]<=0) return bsfractions(inputArray,10,code[2]);
  else return bs(inputArray,code);
}

var displaymode = "No"; //"Yes";

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
         b[i].sort(sortNumber);
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
  for (i = 1; i < input.length; i++) {
    if (max < input[i]) {
      max = input[i];
    }
  }
  output[0] = Math.floor(max);
  output[1] = Math.floor(Math.sqrt(input.length));
  output[2] = arrlen;
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
    if (displaymode == "Yes") console.log("empty buckets ",b);
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
