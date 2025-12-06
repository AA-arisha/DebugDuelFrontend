import img1 from '../images/universe1.jpg'

export const QUESTIONS = {
  1: {
    id: 1,
    title: 'Sum Function Returns Undefined',
    tagline: 'JavaScript universe: a silent bug lurks.',
    language: 'javascript',
    description: 'Fix this bug: The function always returns undefined. Why?',
    code: `function sum(a, b) {
  console.log(a + b)
}
sum(3, 5)
// Expected: 8`,
    expected: 'Expected STDOUT: 8',
    image: img1,
  },
  2: {
    id: 2,
    title: 'IndexError at the edge',
    tagline: 'Python universe: off-by-one strikes again.',
    language: 'python',
    description: 'Debug slicing: ensure last element is included without IndexError.',
    code: `nums = [1,2,3,4]
print(sum(nums[0:len(nums)]))  # Expected: 10`,
    expected: 'Expected STDOUT: 10',
    image: img1,
  },
  3: {
    id: 3,
    title: 'C++ missing return',
    tagline: 'C++ universe: undefined behavior ahead.',
    language: 'cpp',
    description: 'Function forgets to return a value properly.',
    code: `#include <iostream>
int sum(int a, int b) { return a + b; }
int main(){ std::cout << sum(3,5) << std::endl; return 0; }`,
    expected: 'Expected STDOUT: 8',
    image: img1,
  },
  4: {
    id: 4,
    title: 'Java NPE on equals',
    tagline: 'Java universe: mind your nulls.',
    language: 'java',
    description: 'Fix equals check to avoid NullPointerException.',
    code: `public class Main {
  public static void main(String[] args){
    String s = null;
    System.out.println("SAFE: " + String.valueOf("ok".equals(s)));
  }
}`,
    expected: 'Expected STDOUT: SAFE: false',
    image: img1,
  },
}

export const getQuestionById = (id) => QUESTIONS[id] ?? QUESTIONS[1]