# Files and Directories to Delete - Master List

## ⚠️ IMPORTANT
**Bu dosyalar EN SON silinecek!**  
Tüm migration işlemleri tamamlandıktan ve testler yapıldıktan sonra silinecek.

---

## Task 5.1: Math Games (102 files)
```powershell
Remove-Item -Path "apps/web/src/components/academic/math" -Recurse -Force
```

---

## Task 5.2: Logic Games (128 files)
```powershell
Remove-Item -Path "components/logic-games" -Recurse -Force
```

---

## Task 5.3: Turkish Games (30 files)
```powershell
Remove-Item -Path "components/academic/turkish" -Recurse -Force
```

---

## Task 5.4: English Games (5 files)
```powershell
Remove-Item -Path "components/academic/english" -Recurse -Force
```

---

## Task 5.5: Other Features (84 files)
```powershell
Remove-Item -Path "components/fast-reading" -Recurse -Force
Remove-Item -Path "components/focus" -Recurse -Force
Remove-Item -Path "components/learning" -Recurse -Force
Remove-Item -Path "components/language" -Recurse -Force
Remove-Item -Path "components/stories" -Recurse -Force
Remove-Item -Path "components/teacher-tools" -Recurse -Force
```

---

## Task 5.6: Life Skills Features (83 files)
```powershell
Remove-Item -Path "components/life-skills" -Recurse -Force
Remove-Item -Path "components/first-aid" -Recurse -Force
Remove-Item -Path "components/traffic" -Recurse -Force
```

---

## Task 5.7: Common Components (10 files)
```powershell
Remove-Item -Path "components/common" -Recurse -Force
Remove-Item -Path "components/core" -Recurse -Force
```

---

## Summary

### Total Files to Delete: 442 files

### Directories to Delete:
1. ✅ `apps/web/src/components/academic/math/` (102 files) - Task 5.1
2. ✅ `components/logic-games/` (128 files) - Task 5.2
3. ✅ `components/academic/turkish/` (30 files) - Task 5.3
4. ✅ `components/academic/english/` (5 files) - Task 5.4
5. ✅ `components/fast-reading/` (28 files) - Task 5.5
6. ✅ `components/focus/` (8 files) - Task 5.5
7. ✅ `components/learning/` (13 files) - Task 5.5
8. ✅ `components/language/` (13 files) - Task 5.5
9. ✅ `components/stories/` (3 files) - Task 5.5
10. ✅ `components/teacher-tools/` (19 files) - Task 5.5
11. ✅ `components/life-skills/` (69 files) - Task 5.6
12. ✅ `components/first-aid/` (4 files) - Task 5.6
13. ✅ `components/traffic/` (10 files) - Task 5.6
14. ✅ `components/common/` (7 files) - Task 5.7
15. ✅ `components/core/` (3 files) - Task 5.7

---

## Complete Cleanup Script (Run at the END)

### PowerShell Script
```powershell
# Task 5.1 - Math Games
Remove-Item -Path "apps/web/src/components/academic/math" -Recurse -Force

# Task 5.2 - Logic Games
Remove-Item -Path "components/logic-games" -Recurse -Force

# Task 5.3 - Turkish Games
Remove-Item -Path "components/academic/turkish" -Recurse -Force

# Task 5.4 - English Games
Remove-Item -Path "components/academic/english" -Recurse -Force

# Task 5.5 - Other Features
Remove-Item -Path "components/fast-reading" -Recurse -Force
Remove-Item -Path "components/focus" -Recurse -Force
Remove-Item -Path "components/learning" -Recurse -Force
Remove-Item -Path "components/language" -Recurse -Force
Remove-Item -Path "components/stories" -Recurse -Force
Remove-Item -Path "components/teacher-tools" -Recurse -Force

# Task 5.6 - Life Skills
Remove-Item -Path "components/life-skills" -Recurse -Force
Remove-Item -Path "components/first-aid" -Recurse -Force
Remove-Item -Path "components/traffic" -Recurse -Force

# Task 5.7 - Common Components (after migration)
Remove-Item -Path "components/common" -Recurse -Force
Remove-Item -Path "components/core" -Recurse -Force

Write-Host "✅ Cleanup completed!" -ForegroundColor Green
```

### Bash Script
```bash
# Task 5.1 - Math Games
rm -rf apps/web/src/components/academic/math/

# Task 5.2 - Logic Games
rm -rf components/logic-games/

# Task 5.3 - Turkish Games
rm -rf components/academic/turkish/

# Task 5.4 - English Games
rm -rf components/academic/english/

# Task 5.5 - Other Features
rm -rf components/fast-reading/
rm -rf components/focus/
rm -rf components/learning/
rm -rf components/language/
rm -rf components/stories/
rm -rf components/teacher-tools/

# Task 5.6 - Life Skills
rm -rf components/life-skills/
rm -rf components/first-aid/
rm -rf components/traffic/

# Task 5.7 - Common Components (after migration)
# rm -rf components/common/
# rm -rf components/core/

echo "✅ Cleanup completed!"
```

---

## When to Run This Script

**RUN AFTER:**
- ✅ All component migrations completed (Tasks 5.1-5.7)
- ✅ Import paths updated (Task 5.8)
- ✅ All tests passing (Task 5.9)
- ✅ Manual verification completed
- ✅ Backup created (recommended)

**DO NOT RUN BEFORE:**
- ❌ Import path updates
- ❌ Testing phase
- ❌ Verification phase

---

## Verification Before Deletion

Before running the cleanup script, verify:

1. All new locations have the files:
   ```powershell
   Get-ChildItem -Path "micro-frontends/math-games/src/games" -Recurse -File | Measure-Object
   Get-ChildItem -Path "micro-frontends/logic-games/src/games" -Recurse -File | Measure-Object
   Get-ChildItem -Path "micro-frontends/language-games/src/games" -Recurse -File | Measure-Object
   Get-ChildItem -Path "apps/web/src/features" -Recurse -File | Measure-Object
   ```

2. No broken imports:
   ```powershell
   npm run build
   ```

3. All tests passing:
   ```powershell
   npm run test
   ```

---

## Notes

- This file will be updated as more tasks are completed
- Keep this file until Phase 3 is fully completed
- Create a backup before running the cleanup script
- The cleanup is part of Task 13.1 (Faz 7: Kod Temizleme)
