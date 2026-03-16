# Math Games Source Files Deletion Guide

## ⚠️ IMPORTANT: Read Before Deleting

Before deleting any source files, ensure:
1. ✅ All games load correctly in the micro-frontend
2. ✅ Import paths in the host app have been updated
3. ✅ The micro-frontend integration is tested and working
4. ✅ You have a backup or the changes are committed to version control

## Files to Delete

### Complete Directory
The entire math directory and all its contents should be deleted:
```
apps/web/src/components/academic/math/
```

This includes:
- **102 game files** across 8 grade levels
- **1 MathMenu.tsx** file
- All subdirectories and their contents

## Deletion Commands

### Option 1: PowerShell (Windows)
```powershell
# Navigate to project root
cd path/to/project

# Delete the math directory
Remove-Item -Path "apps/web/src/components/academic/math" -Recurse -Force

# Verify deletion
Test-Path "apps/web/src/components/academic/math"
# Should return: False
```

### Option 2: Bash (Linux/Mac)
```bash
# Navigate to project root
cd path/to/project

# Delete the math directory
rm -rf apps/web/src/components/academic/math/

# Verify deletion
ls apps/web/src/components/academic/math/
# Should return: No such file or directory
```

### Option 3: Git (Recommended for version control)
```bash
# Navigate to project root
cd path/to/project

# Remove from git and filesystem
git rm -r apps/web/src/components/academic/math/

# Commit the deletion
git commit -m "Remove math games from old location (migrated to micro-frontend)"
```

## Detailed File List

### Total: 102 Files

#### Grade 1: 73 files
- MathGrade1.tsx
- MathGrade1Menu.tsx
- basic/ (14 games)
- comparison/ (15 games)
- geometry/ (16 games)
- measurement/ (7 games)
- numbers/ (4 games)
- rhythmic/ (4 games)
- visual/ (9 games)

#### Grade 2: 13 files
- MathGrade2Menu.tsx
- addition/ (3 games)
- data/ (1 game)
- geometry/ (2 games)
- numbers/ (3 games)
- subtraction/ (3 games)

#### Grade 3: 5 files
- MathGrade3Menu.tsx
- division/ (2 games)
- multiplication/ (2 games)

#### Grade 4: 2 files
- bignumbers/ (2 games)

#### Grade 5: 2 files
- fractions/ (2 games)

#### Grade 6: 2 files
- decimals/ (2 games)

#### Grade 7: 2 files
- integers/ (2 games)

#### Grade 8: 2 files
- exponents/ (2 games)

#### Root: 1 file
- MathMenu.tsx

## Verification After Deletion

After deleting the files, verify:

1. **Check the directory doesn't exist:**
   ```bash
   ls apps/web/src/components/academic/math/
   # Should show: No such file or directory
   ```

2. **Run the build:**
   ```bash
   npm run build
   # or
   turbo build
   ```
   Should complete without errors.

3. **Check for broken imports:**
   ```bash
   # Search for any remaining imports from the old location
   grep -r "components/academic/math" apps/web/src/
   ```
   Should return no results (or only comments/documentation).

4. **Test the application:**
   - Start the dev server
   - Navigate to math games
   - Verify all games load from the micro-frontend

## Rollback Plan

If you need to restore the files:

### If using Git:
```bash
# Restore from the last commit
git checkout HEAD -- apps/web/src/components/academic/math/

# Or restore from a specific commit
git checkout <commit-hash> -- apps/web/src/components/academic/math/
```

### If you have a backup:
```bash
# Copy from backup location
cp -r /path/to/backup/math/ apps/web/src/components/academic/math/
```

## Post-Deletion Checklist

- [ ] Directory deleted successfully
- [ ] Build completes without errors
- [ ] No broken imports found
- [ ] Application runs correctly
- [ ] All math games accessible
- [ ] Micro-frontend loads properly
- [ ] Changes committed to version control

## Notes

- The new location is: `micro-frontends/math-games/src/games/`
- MathMenu.tsx new location: `micro-frontends/math-games/src/components/MathMenu.tsx`
- All index.ts files have been created for proper exports
- Grade 4 menu was created during migration (didn't exist in source)
- Grades 5-8 don't have menu files (by design)

## Support

If you encounter any issues during deletion:
1. Check the TASK_5.1_COMPLETION.md for migration details
2. Verify the micro-frontend structure is complete
3. Ensure all import paths have been updated
4. Test the micro-frontend independently before deleting source files
