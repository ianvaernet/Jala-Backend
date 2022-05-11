import Rectangle from './rectangle';
import Square from './square';

const figures = [new Rectangle(10, 6), new Square(5)];
figures.forEach((figure) => console.log(figure.calculateArea()));
