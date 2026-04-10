
/** Validates the naming convention of keys in the provided content object. empty Record<string, any> objects are considered valid. 
 * Keys must start with "p#" for page-specific content or "c" for reusable components. The function checks that the content is a flat 
 * object and that all keys follow the specified naming convention. If any key does not follow the convention, an 
 * error is thrown with a message indicating the invalid key and the content name.
 * @param content - The object to validate.
 * @param contentName - The name of the content object for error messages.
 * @returns An array of invalid keys, or an empty array if all keys are valid.
 */
export function validateKeyNaming(content: unknown, contentName: string): void {

    if (typeof content !== 'object' || content === null) {
        throw new Error(`${contentName} should be a non-null object`);
    }
    //check to see if its a Record<string, any> type object, if not throw error
    if (Object.values(content).some((value: unknown): value is object => typeof value === 'object' && value !== null)) {
        throw new Error(`${contentName} should be a flat object with string keys and non-object values`);
    }

    //can be empty
    if (Object.keys(content).length === 0) {
        return;
    }



    const keyPattern = /^(p\d+|c).+/
    const invalidKeys = Object.keys(content).filter((key: string): boolean => !keyPattern.test(key));
    if (invalidKeys.length > 0) {
        // eslint-disable-next-line no-undef
        console.log(`Invalid keys in ${contentName}: ${invalidKeys.join(', ')}. Keys must start with "p#" for page-specific content or "c" for reusable components.`);
        throw new Error(`Invalid keys in ${contentName}: ${invalidKeys.join(', ')}. Keys must start with "p#" for page-specific content or "c" for reusable components.`);
    }
    return;
}