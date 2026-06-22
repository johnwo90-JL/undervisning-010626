/**
 * Creates an authorization middleware that requires an authenticated user with
 * at least the provided access level.
 *
 * @param {number} requiredAccessLevel Minimum role/access level required.
 * @returns {import("express").RequestHandler} Express middleware.
 */
export function useAuthorization(requiredAccessLevel) {
    return function (req, res, next) {
        if (!req.user) {
            res.status(401).json({
                success: false,
                error: {
                    message: "Authentication required",
                }
            });
            return;
        }

        if (req.user.role < requiredAccessLevel) {
            res.status(403).json({
                success: false,
                error: {
                    message: "Unauthorized",
                }
            });
            return;
        }
        
        next();
    }
}

/**
 * Alias for `useAuthorization`
 * @param {number} requiredAccessLevel 
 * @returns 
 */
export const useRAL = (requiredAccessLevel) => useAuthorization(requiredAccessLevel);
