---
layout: essay
type: essay
title: Think Before You Ask!
date: 2019-01-23
labels:
  - Questions
  - Answers
  - StackOverflow
---

<img class="ui centered large image" src="../images/스크린샷 2019-01-23 오후 10.46.40.png">



## Software Engineering & Communication

One of the characteristics of communication is that we can achieve exactly what we need through effective communication. This also works for software developers in a similar way whenever they need some advice on technical issues that they cannot solve themselves or feedbacks so that they can develop in better ways. Good communication among developers usually leads to high quality software programs. If that is the case, what should developers do in order to form good communication? They should know how to ask smart questions. For this essay, I am going to use good and bad examples from StackOverflow and compare those examples to explain why smart questions are important for smart software engineers. 

## Good Question

If you were a software engineer, you might have used StackOverflow at least once. According to the StackOverflow website, Stack Overflow is a question and answer site for professional and enthusiast programmers. This is why we, software developers, are able to get useful information on this website most of the time. Let's take a look at a good example on StackOverflow first. 

```
Question: Why is it faster to process a sorted array than an unsorted array?

Here is a piece of C++ code that seems very peculiar. 
For some strange reason, sorting the data miraculously makes the code almost six times faster.

#include <algorithm>
#include <ctime>
#include <iostream>

int main()
{
    // Generate data
    const unsigned arraySize = 32768;
    int data[arraySize];

    for (unsigned c = 0; c < arraySize; ++c)
        data[c] = std::rand() % 256;

    // !!! With this, the next loop runs faster
    std::sort(data, data + arraySize);

    // Test
    clock_t start = clock();
    long long sum = 0;

    for (unsigned i = 0; i < 100000; ++i)
    {
        // Primary loop
        for (unsigned c = 0; c < arraySize; ++c)
        {
            if (data[c] >= 128)
                sum += data[c];
        }
    }

    double elapsedTime = static_cast<double>(clock() - start) / CLOCKS_PER_SEC;

    std::cout << elapsedTime << std::endl;
    std::cout << "sum = " << sum << std::endl;
    
Without std::sort(data, data + arraySize);, the code runs in 11.54 seconds.
With the sorted data, the code runs in 1.93 seconds.
My first thought was that sorting brings the data into the cache, but then I thought how silly that is because the array was just generated.

-What is going on?
-Why is it faster to process a sorted array than an unsorted array?
-The code is summing up some independent terms, and the order should not matter.

```
URL: https://stackoverflow.com/questions/11227809/why-is-it-faster-to-process-a-sorted-array-than-an-unsorted-array

This question seems to be a good example in many ways. First, a person who asked this question on StackOverflow clearly stated what his question is and then asked in detail at the end of his post. Second, he clearly showed how hard he had worked on his problem and exactly where he had faced an issue while he was working on it. The one who asked this question showed organized procedure so that other developers can quickly figure out the problem and answer the question. Lastly, this question seems very thought-provoking because lots of developers tried answering this question and a lot of users gave points to this question for being useful enough.


## Bad Question

It is not guaranteed that everyone can enjoy the benefit of StackOverflow with ambiguous, unorganized, bad questions. Let’s take a look at a bad example on StackOverflow. 

```
Q: Is it better to develop on Mac or Windows?

I have noticed a lot of developer these day developing on Macs. 
I have never use one for an extended period of time or to develop. 
I was thinking of investing in one for programming purposes but don't have sufficient knowledge in pros/cons of developing on Mac OS X or Windows. 
I was hoping you all could help provide guidance as to which platform is better suited for development?

Thanks in advance :)

**No Flame Wars Please, hoping we can keep this civilized. :)
```
URL: https://stackoverflow.com/questions/3216018/is-it-better-to-develop-on-mac-or-windows

This question seems to be a bad example in every way. This kind of question is everywhere if you search on google. This question was posted about a decade ago and only 4 developers have answered this question and they all said “it depends”. This question is more like a “trivial question based on a simple curiosity” rather than problem solving stuff. There is no evidence that a person who asked this question tried hard to take care of this matter by himself/herself. In other words, this question is “not smart” at all. 

## Conclusion
At first, I thought I could ask anything regarding computer science on StackOverflow. But after I read the guidelines provided by Eric Raymond and found some examples on StackOverflow, I was able to change my attitude toward StackOverflow and furthermore, toward communication skills of software engineers. 
