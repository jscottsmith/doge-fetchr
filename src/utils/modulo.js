// real modulo, accounts for floats and negative integers

export default function modulo(a, b) {
    return (a % b + b) % b;
}
