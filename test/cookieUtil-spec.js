/**
 * Created by channing on 14/12/15.
 */

describe('cookie', function() {

    describe('get', function() {

        document.cookie = 'ck_test_1=1';
        document.cookie = 'ck_test_2';
        document.cookie = 'ck_test_3=';
        document.cookie = 'ck_test_4[t]=xx';

        it('should return the cookie value for the given name.', function() {

            expect(cookie.get('ck_test_1')).to.equal('1');
            expect(cookie.get('ck_test_2')).to.equal('');
            expect(cookie.get('ck_test_3')).to.equal('');
            expect(cookie.get('ck_test_4[t]')).to.equal('xx');

        });

        it('should return undefined for non-existing name.', function() {

            expect(cookie.get('ck_test_none')).to.equal(undefined);

        });

        it('should throw error for invalid name.', function() {

            expect(function(){ cookie.get(true); }).to.throwError();
            expect(function(){ cookie.get({}); }).to.throwError();
            expect(function(){ cookie.get(null); }).to.throwError();

        });

    });

    describe('set', function() {

        it('should set a cookie with a given name and value.', function() {

            cookie.set('ck_test_11', 'xx');
            expect(cookie.get('ck_test_11')).to.equal('xx');

            cookie.set('ck_test_12', 'xx', { expires: -1 });
            expect(cookie.get('ck_test_12')).to.equal(undefined);

            cookie.set('ck_test_13', '2', {
                expires: new Date(2099, 1, 1),
                path: '/'
            });
            expect(cookie.get('ck_test_13')).to.equal('2');

            cookie.remove('ck_test_14');
            cookie.set('ck_test_14', '4', {
                domain: document.domain,
                path: '/',
                secure: true
            });
            expect(cookie.get('ck_test_14')).to.equal(undefined);

        });

    });

    describe('remove', function() {

        it('should remove a cookie from the machine.', function() {

            cookie.set('ck_test_21', 'xx');
            cookie.remove('ck_test_21');
            expect(cookie.get('ck_test_21')).to.equal(undefined);

            cookie.set('ck_test_22', 'xx', {
                expires: new Date(2099, 1, 1),
                path: '/'
            });
            cookie.remove('ck_test_22', {
                path: '/'
            });
            expect(cookie.get('ck_test_22')).to.equal(undefined);

        });
    });

});
