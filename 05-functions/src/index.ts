{
    interface A {
        good(x: number): string
    }

    interface A {
        bad(x: number): string
    }

    interface B extends A {
        good(x: number): string,
        bad(x: number): string
    }

    let test: B = {
        good(x: number): string {
            return '';
        },

        bad(x: number): string {
            return '';
        }
    }
}
